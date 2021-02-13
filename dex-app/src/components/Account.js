import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import provider from '../services/provider';
import EthereumConnexion from '../services/EthereumConnexion';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function Account() {

    const [accounts, setAccounts] = useState([]);
    //const [selectedAccount, setSelectedAccount] = useState();
    const [balance, setBalance] = useState(1000);

    let selectedAccount;

    useEffect(() => {
        provider.listAccounts().then(function (result) {
            console.log(result);
            setAccounts(result);
            console.log(selectedAccount);
        }).catch(function (error) {
            console.log(error);
        });
        selectedAccount = 0;
        setBalance(1000);
    }, []);

    function handleChange(event) {

        selectedAccount = event.target.value;

        return CheckBalance();
    };

    function CheckBalance() {

        console.log("Checking balance of account: " + accounts[selectedAccount]);

        console.log(selectedAccount);

        EthereumConnexion.CreateInstances();
        const tokenInstance = EthereumConnexion.GetInstance();

        tokenInstance.balanceOf(accounts[selectedAccount]).then(function (result) {
            console.log("Received: " + result);
            const res = parseFloat(result.toString()) / 10 ** 18;
            console.log(res);
            setBalance(res);
            console.log("After set balance: "+balance)
        }).catch(function (error) {
            console.log(error);
        });
    };

    return (
        <Form>
            <Form.Row>
                <Form.Group className="account">
                    <Form.Label>Select an account: </Form.Label>
                    <Form.Control as="select" value={selectedAccount} onChange={handleChange}>
                        {accounts.map((account) => (
                            <option key={accounts.indexOf(account).toString()} value={accounts.indexOf(account)}>{account}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group className="account">
                    <Form.Label>Current account's balance:</Form.Label>
                    <Form.Control type="text" placeholder={balance+" IKC"} readOnly/>
                </Form.Group>
            </Form.Row>
        </Form>
    );
};

export default Account;