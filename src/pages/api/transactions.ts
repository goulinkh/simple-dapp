import { PrismaClient, Transaction } from "@prisma/client";
import { BigNumber, ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

type Input = Omit<Transaction, "value"> & { value: { hex: string } };

async function verifyTxIsValid(tx: Input) {
  const response = await fetch(
    `https://api-goerli.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=${tx.hash}&apikey=${process.env.ETHERSCAN_API_KEY}`
  );
  const payload = await response.json();
  if (payload.error) {
    throw new Error("invalid transaction details");
  }
  if (!payload.result) {
    // ignore, too early to get the value from the API
    // I'm what's the correct way to handle this
    return;
  }
  const etherscanTx = payload.result;
  if (
    etherscanTx.from !== tx.from.toLowerCase() ||
    etherscanTx.to !== tx.to.toLowerCase()
    // TODO: verify the tx's value
  )
    throw new Error("invalid transaction details");
  return;
}

async function createTransaction(tx: Input) {
  await verifyTxIsValid(tx);
  const criterions = {
    from: tx.from,
    to: tx.to,
    hash: tx.hash,
    value: ethers.utils.formatEther(BigNumber.from(tx.value)),
  };
  const txInDB = await prisma.transaction.findFirst({ where: criterions });
  if (!txInDB) {
    await prisma.transaction.create({
      data: {
        createdAt: new Date(),
        ...criterions,
      },
    });
  }
}

function listAllTx(address: string) {
  return prisma.transaction.findMany({
    where: { OR: [{ from: address }, { to: address }] },
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Transaction[]>
) {
  if (req.method === "POST") {
    // TODO: tx input validation
    const tx = req.body;
    await createTransaction(tx);
    res.status(200).json(await listAllTx(tx.from));
  }
  const { address } = req.query;
  if (address) {
    res.status(200).json(await listAllTx(address as string));
  }
}
