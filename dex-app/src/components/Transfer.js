import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { ethers } from "ethers";
import provider from '../services/provider';
import EthereumConnexion from '../services/EthereumConnexion';
import AlertFailed from './AlertFailed';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function Transfer() {

    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState('');
    const [amount, setAmount] = useState(0);
    const [showFailure, setShowFailure] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        provider.listAccounts().then(function (result) {
            console.log(result);
            setAccounts(result);
            setSelectedAccount(accounts[0]);

        }).catch(function (error) {
            console.log(error);
        });
    }, []);

    function handleChange(event) {
        setSelectedAccount(event.target.value);
    };

    function handleAmount(event) {
        setAmount(event.target.value);
    };

    function handleSubmit(event) {

        event.preventDefault();

        // if (parseFloat(amount) <= 0) {
        //     window.alert("Amount is not corect!")
        //     return;
        // }

        const amountToTransfer = ethers.utils.parseEther(amount);// * (10 ** 18); 
        console.log(amountToTransfer);

        console.log("Request tranfer. To: " + accounts[selectedAccount] + ", Amount: " + amount);

        const to = accounts[selectedAccount];

        EthereumConnexion.CreateInstances();
        const insanceWithSigner = EthereumConnexion.GetInsanceWithSigner();

        console.log(insanceWithSigner);

        insanceWithSigner.transfer(to, amountToTransfer)
            .then(function (result) {
                console.log("Transfer succeded!" + result);
                setShowSuccess(true);
            }).catch(function (error) {
                console.log(error);
                setShowFailure(true);
            });

    };
    return (
        <>
            <Form className="form" onSubmit={handleSubmit}>
                <div className="center">
                    <h3>Send Tokens</h3>
                </div>
                <Form.Row>
                    <Form.Group className="account">
                        <Form.Label>To Address</Form.Label>
                        <Form.Control as="select" value={selectedAccount} onChange={handleChange}>
                            {accounts.map((account) => (
                                <option key={accounts.indexOf(account).toString()} value={accounts.indexOf(account)}>{account}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="account">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="number" value={amount} onChange={handleAmount} />
                    </Form.Group>
                </Form.Row>
                <Form.Group className="transfer">
                    <div className="center">
                        <Button variant="primary" type="submit">
                            Transfer
                    </Button>
                    </div>
                </Form.Group>
            </Form>
            {
                showFailure && 
                <Alert variant="danger" onClose={() => setShowFailure(false)} dismissible>
                    <Alert.Heading>Something went wrong!</Alert.Heading>
                    <p>
                        The amount is not correct.
                    </p>
                </Alert>
            }
            {
                showSuccess && 
                <Alert variant="primary" onClose={() => setShowSuccess(false)} dismissible>
                    <Alert.Heading>Transfer succesful!</Alert.Heading>
                    <p>
                        The amount is succesfully transfered.
                    </p>
                </Alert>
            }
        </>
    );
};

export default Transfer;