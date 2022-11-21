import { Button, Divider, Input } from "antd";
import React, { useState } from "react";
import { EtherInput } from "../components";
import { utils } from "ethers";

export default function MainPage({ tx, writeContracts, price }) {
  const [newName, setNewName] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [value, setValue] = useState(0);

  return (
    <div>
      <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
        <h2> Please fill in the boxes</h2>
        <Divider />
        <div style={{ margin: 8 }}>
          <Input
            placeholder="Name"
            value={newName}
            onChange={e => {
              setNewName(e.target.value);
            }}
          />
          <Input
            style={{ marginTop: 8, marginBottom: 8 }}
            placeholder="Message"
            value={newMessage}
            onChange={e => {
              setNewMessage(e.target.value);
            }}
          />
          <EtherInput
            autofocus
            price={price}
            placeholder="Enter amount"
            value={value}
            onChange={amount => {
              setValue(amount);
            }}
          />
          <Button
            style={{ marginTop: 8 }}
            onClick={async () => {
              /* look how you call setPurpose on your contract: */
              /* notice how you pass a call back for tx updates too */
              const result = tx(
                writeContracts.BuyMeCoffee.buyCoffee(newName, newMessage, { value: utils.parseEther(value) }),
                update => {
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
                },
              );
              console.log("awaiting metamask/web3 confirm result...", result);
              console.log(await result);
              setNewMessage("");
              setNewName("");
              setValue("");
            }}
          >
            Buy Coffee!
          </Button>
        </div>
      </div>
    </div>
  );
}
