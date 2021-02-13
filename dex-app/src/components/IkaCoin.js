import React, { useState, useEffect } from 'react';
import EthereumConnexion from '../services/EthereumConnexion';
import logo from '../assets/logo.png';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function IkaCoin() {

    const [name, setName] = useState("");
    const [symbol, setSymbol] = useState("");
    const [totalSupply, setTotalSupply] = useState(0);

    useEffect(() => {

        EthereumConnexion.CreateInstances();
        const tokenInstance = EthereumConnexion.GetInstance();

        tokenInstance.name().then(function (result) {
            setName(result);
        }).catch(function (error) {
            console.log(error);
        });

        tokenInstance.symbol().then(function (result) {
            setSymbol(result);
        }).catch(function (error) {
            console.log(error);
        });

        tokenInstance.totalSupply().then(function (result) {
            let supp = parseFloat(result.toString()) / 10 ** 18;
            setTotalSupply(supp);
        }).catch(function (error) {
            console.log(error);
        });

    }, []);

    return (
        <>
            <div className="center" >
                <img className="logo" src={logo} />
            </div>
            <div className="infos-name">
                <h5><b>{name}</b></h5>
            </div>
            <div className="infos-supply">
                <h5>Total Supply: {totalSupply} {symbol}</h5>
            </div>
        </>
    );
};

export default IkaCoin;
