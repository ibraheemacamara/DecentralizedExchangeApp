
import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function AlertFailed() {
    const [show, setShow] = useState(true);

    if (show) {
        return (
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Something went wrong!</Alert.Heading>
                <p>
                    The amount is not correct.
                </p>
            </Alert>
        );
    }
    return (
        <></>
    );
}

export default AlertFailed;