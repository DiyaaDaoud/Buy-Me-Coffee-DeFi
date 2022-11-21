import { Button, Divider, Input, List, Table } from "antd";
import React, { useState } from "react";
import { Balance } from "../components";
import { utils } from "ethers";

export default function MainOwnerPage({ memos, price, sumTips, tx, writeContracts }) {
  //   const [newName, setNewName] = useState("");
  //   const [newMessage, setNewMessage] = useState("");
  //   const [value, setValue] = useState(0);
  const columns = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
      align: "center",
      width: 100,
    },

    {
      key: "amount",
      title: "Amount (ETH)",
      dataIndex: "amount",
      sorter: (record1, record2) => {
        return record1.amount > record2.amount;
      },
      align: "center",
      width: 150,
    },
    {
      key: "message",
      title: "Message",
      dataIndex: "message",
      align: "center",
    },
  ];
  let dataSource = [];
  let userAmount;
  let currentInput;
  for (let i = 0; i < memos.length; i++) {
    userAmount = utils.formatEther(memos[i].amount, "ether").toString();
    console.log("*#*#*#user amount is ", userAmount);
    currentInput = {
      name: memos[i].name,
      message: memos[i].message,
      amount: userAmount,
    };
    dataSource.push(currentInput);
  }
  console.log("dataSource is:", dataSource);
  return (
    <div style={{ maxWidth: 700, margin: "auto", marginTop: 32, marginBottom: 32 }}>
      <h2>
        Your current wirhdraw amount is :
        <Balance balance={sumTips ? sumTips : ""} dollarMultiplier={price} />
      </h2>
      <Button
        style={{ marginTop: 8, marginBottom: 8 }}
        onClick={async () => {
          /* look how you call setPurpose on your contract: */
          /* notice how you pass a call back for tx updates too */
          const result = tx(writeContracts.BuyMeCoffee.withdrawTips(), update => {
            console.log("📡 Transaction Update:", update);
            if (update && (update.status === "confirmed" || update.status === 1)) {
              console.log(" 🍾 Transaction " + update.hash + " finished!");
              console.log(
                " ⛽️ " +
                  update.gasUsed +
                  "/" +
                  (update.gasLimit || update.gas) +
                  " @ " +
                  parseFloat(update.gasPrice) / 1000000000 +
                  " gwei",
              );
            }
          });
          console.log("awaiting metamask/web3 confirm result...", result);
          console.log(await result);
        }}
      >
        Withdraw Now!
      </Button>
      <Table columns={columns} dataSource={dataSource} size={"small"} style={{ marginTop: 20 }}></Table>
    </div>
  );
}
