import React, { useState } from 'react';
import { Input, Button, message } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeftOutlined, CheckOutlined } from '@ant-design/icons';
import EndPoint from '../endpoints';
const { TextArea } = Input;

const PersonalDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { formData } = location.state || {};

    const [house, setHouse] = useState('');
    const [agreementBase64, setAgreementBase64] = useState('');
    const [reason, setReason] = useState('');
    const [amount, setAmount] = useState('');

    const handleHouseDetails = (event) => {
        setHouse(event.target.value);
    };

    const handleFileData = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setAgreementBase64(reader.result); // Use reader.result to get the base64 encoded string
        };
        reader.readAsDataURL(file);
    };

    const handleReasonChange = (event) => {
        setReason(event.target.value);
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleBack = () => {
        navigate('/AfterLogin');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('status', formData.status);
        formDataToSend.append('occupation', formData.occupation);
        formDataToSend.append('contactNo', formData.contactNo);
        formDataToSend.append('gName', formData.gName);
        formDataToSend.append('gContact', formData.gContact);
        formDataToSend.append('gRelation', formData.gRelation);
        formDataToSend.append('house', house);
        formDataToSend.append('reason', reason);
        formDataToSend.append('amount', amount);
        formDataToSend.append('length', '1'); // Assuming 'length' is a string
        formDataToSend.append('isPicked', formData.isPicked); // Assuming 'isPicked' is a boolean or string
        formDataToSend.append('studentId', formData.studentId);

        try {
            const response = await fetch(EndPoint.sendApplication, {
                method: 'POST',
                body: formDataToSend // Submit formData to the server
            });

            if (response.ok) {
                message.success("Submitted Successfully.");
                setTimeout(() => {
                    navigate('/StudentDashboard');
                }, 1500);
            } else {
                message.error("Submission Failed.");
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
            message.error("Submission Failed.");
        }
    };

    return (
        <div className="container">
            <div className="form-box">
                <header>
                    <h1 id="title">Personal Details</h1>
                </header>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>House</label>
                        <div className='RadioButton'>
                            <label>
                                <input
                                    type="radio"
                                    name="house"
                                    value="own"
                                    checked={house === "own"}
                                    onChange={handleHouseDetails}
                                />
                                Own
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="house"
                                    value="rent"
                                    checked={house === "rent"}
                                    onChange={handleHouseDetails}
                                />
                                Rent
                            </label>
                        </div>
                        <br />
                        <label>House Agreement</label>
                        <input
                            type="file"
                            accept=".pdf, .doc, .docx"
                            onChange={handleFileData}
                        />
                        <div>
                            <label>Reason for scholarship</label>
                            <br />
                            <TextArea placeholder="Reason..." value={reason} onChange={handleReasonChange} />
                        </div>
                        <div>
                            <label>Required Amount</label>
                            <br />
                            <Input
                                type="number"
                                inputMode="numeric"
                                min={0}
                                required
                                placeholder="Enter Amount"
                                value={amount}
                                onChange={handleAmountChange}
                            />
                        </div>
                        <br />
                        <div className='Buttons'>
                            <Button type='primary' onClick={handleBack} icon={<ArrowLeftOutlined />}>Back</Button>
                            <Button type='primary' htmlType="submit" icon={<CheckOutlined />}>Submit</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PersonalDetails;
