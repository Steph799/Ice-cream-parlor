import React, { useState, useEffect } from 'react'
import {
    pricesPerWeight, maxWeight, maxFlavors, allFlavors, maxFlavorsPerWeight, deliveryTimeValidationMsg,
    deliveryServiceHours, distinctFlavorsMsg
} from '../../shared/constants'
import Button from '@mui/material/Button';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router';
import RenderSelect from '../utils/RenderSelect';
import { Container } from '@mui/material';
import MyTextField from '../utils/MyTextField';


const initialValues = {
    weight: '',   //1 kg up to 2 flavors. 1.5 up to 3, 2kg up to 3, 3 kg up to 4
    flavors: ['', '', '', ''],
    time: ''
};


const validationSchema = Yup.object().shape({
    weight: Yup.number().min(1).max(maxWeight).required('Required!'),
    flavors: Yup.array().min(1).max(maxFlavors).of(Yup.string()).required('Required!'),
    time: Yup.string().required('Required!')
});

function Delivery() {
    const navigate = useNavigate();
    const [currentWeight, setCurrentWeight] = useState(0)
    const params = useParams()
    let arrParams = null
    const [savedValues, setSavedValues] = useState(null)

    const initialButtons = [{ key: 1, isTabOpen: false, isVisible: true }, { key: 2, isTabOpen: false, isVisible: false },
    { key: 3, isTabOpen: false, isVisible: false }, { key: 4, isTabOpen: false, isVisible: false }] //case of no flavors
    const [buttons, setButtons] = useState(initialButtons)

    //create saved flavors arr
    const recreateFlavorArr = (flavorStr) => {
        const flavors = flavorStr.split(',') //init arr of flavors
        const initialFlavors = [...initialValues.flavors]
        for (let i = 0; i < flavors.length; i++) initialFlavors[i] = flavors[i]; //copy the relevant flavors to the requested pattern
        return initialFlavors
    }


    useEffect(() => {
        if (params['*']) {
            const split = params['*'].split('/')
            arrParams = split.map(param => param.substring(1))
            const newValues = {
                weight: arrParams[0],
                flavors: recreateFlavorArr(arrParams[1]),
                time: arrParams[2],
            }

            //adjust the buttons to the flavor array
            const flavorsMaxLength = maxFlavorsPerWeight(newValues.weight)
            const updatedButtons = [...buttons]
            let counter = 0
            for (let i = 0; i < flavorsMaxLength; i++) {
                if (newValues.flavors[i]) {
                    updatedButtons[i].isTabOpen = updatedButtons[i].isVisible = true
                    counter++
                }
                else if (counter < flavorsMaxLength) { //first empty index
                    updatedButtons[i].isVisible = true
                    break;
                }
            }

            setSavedValues(newValues)
            setButtons(updatedButtons)
        }
    }, [])

    const handleWeightChange = (newWeight, flavorArr) => {
        if (newWeight !== currentWeight) { //refresh all flavors
            for (let i = 0; i < flavorArr.length; i++)
                if (flavorArr[i]) flavorArr[i] = ''

            setCurrentWeight(newWeight)
            setButtons(initialButtons) //always the initial (with the empty values)        
        }
    }

    const validHour = (orderHour, openHour, closeHour) => { //will be called after submit
        const hourOfOrder = Number(orderHour[0])
        const minutesOfOrder = Number(orderHour[1]);
        const today = new Date()
        const currentMinutes = today.getMinutes();
        const currentHour = today.getHours();

        if (currentHour >= openHour && currentHour < closeHour) { //active hours
            if ((hourOfOrder < currentHour) || (hourOfOrder === currentHour && minutesOfOrder <= currentMinutes)) {
                alert(deliveryTimeValidationMsg) //check
                return false
            }
            else if (hourOfOrder < openHour || hourOfOrder >= closeHour) {
                alert(deliveryServiceHours)
                return false
            }
            else if ((hourOfOrder > currentHour) || (hourOfOrder === currentHour && minutesOfOrder > currentMinutes)) {
                return hourOfOrder >= openHour && hourOfOrder <= closeHour
            }
        }
        alert(deliveryServiceHours)
        return false
    }

    const chosenFlavors = (weight, flavors) => { //will be called after submit
        const userFlavors = []
        const flavorsMaxLength = maxFlavorsPerWeight(weight)
        for (let i = 0; i < flavorsMaxLength; i++) {
            const currentFlavor = flavors[i];
            for (let j = i + 1; j < flavorsMaxLength; j++) {
                if (currentFlavor && flavors[j] === currentFlavor) return false
            }
            if (currentFlavor) userFlavors.push(currentFlavor)
        }
        return userFlavors
    }

    const onSubmit = async (values) => {
        const { weight, flavors, time } = values

        if (!validHour(time.split(':'), 10, 22)) return

        const userFlavors = chosenFlavors(weight, flavors)
        if (!userFlavors) {
            alert(distinctFlavorsMsg)
            return
        }
        //  console.log(weight, pricesPerWeight[weight], time)
        try {
            navigate(`/payment/${weight}/${userFlavors}/${pricesPerWeight[weight]}/${time}`)
        } catch (error) {
            alert(error);
        }
    };


    const handleFlavorChange = (weight) => { //only if a flavor was set (side effect- open new add btn if possible)
        const visibleTabs = buttons.filter(btn => btn.isVisible).length //get the number of visible buttons

        if (visibleTabs < maxFlavorsPerWeight(weight)) {
            const firstTabNotVisible = buttons.findIndex(btn => !btn.isVisible)

            if (firstTabNotVisible > 0) {
                const updatedButtons = [...buttons]
                updatedButtons[firstTabNotVisible].isVisible = true
                setButtons(updatedButtons)
            }
        }
    }


    const handleClick = (index, weight, flavorArr) => {
        const updatedIndex = buttons[index]
        updatedIndex.isTabOpen = !updatedIndex.isTabOpen
        const updatedButtons = [...buttons.slice(0, index), updatedIndex, ...buttons.slice(index + 1)]

        if (!updatedIndex.isTabOpen) {
            flavorArr[index] = ''
            let counter = 0
            const flavorsMaxLength = maxFlavorsPerWeight(weight)

            for (let i = 0; i < flavorsMaxLength; i++) {
                if (!flavorArr[i]) {
                    counter++
                    if (updatedButtons[i].isTabOpen || updatedButtons[i].isVisible)
                        updatedButtons[i].isTabOpen = updatedButtons[i].isVisible = false
                }
                if (counter === flavorsMaxLength) updatedButtons[0].isVisible = true
            }
            flavorArr.sort().reverse() //if there are flavors, they will appear first
            updatedButtons.sort((a, b) => b.isVisible - a.isVisible)

            const nextEmptyIndex = updatedButtons.findIndex(btn => !btn.isVisible)
            if (nextEmptyIndex > 0 && flavorArr[nextEmptyIndex - 1]) updatedButtons[nextEmptyIndex].isVisible = true
        }

        setButtons(updatedButtons)
    }

    return (
        <div className="ice-cream-per-weight">
            <Container maxWidth="sm" >
                <br />
                <Formik
                    initialValues={savedValues || initialValues}
                    validationSchema={validationSchema} //validate
                    onSubmit={async (values) => { await onSubmit(values); }}
                    enableReinitialize
                >
                    {(formik) => {
                        return (
                            <Form justifycontent="center">
                                <RenderSelect options={Object.keys(pricesPerWeight).sort((a, b) => a - b)} label="Weight in kg"
                                    value={formik.values.weight}
                                    name="weight"
                                    formik={formik}
                                    onChangeExtra={() => handleWeightChange(formik.values.weight, formik.values.flavors)}
                                />
                                <br />

                                {formik.values.weight > 0 && buttons.map((btn, index) => {
                                    return (
                                        btn.isVisible && <div key={btn.key} style={{ display: "flex" }}>
                                            <Button type="button" size="small" color={btn.isTabOpen ? "error" : "primary"} variant='contained'
                                                onClick={() => handleClick(index, formik.values.weight, formik.values.flavors)}
                                                style={{ height: '3rem', marginRight: '1rem', marginBottom: '1rem' }} >
                                                {btn.isTabOpen ? "- Remove flavor" : "+ Add flavor"}
                                            </Button>
                                            {btn.isTabOpen && <RenderSelect options={allFlavors} label="Flavor"
                                                value={formik.values.flavors[index]}
                                                name={`flavors[${index}]`}
                                                formik={formik}
                                                onChangeExtra={(e) => handleFlavorChange(formik.values.weight)}
                                            />}
                                        </div>
                                    )//e.target.selectedIndex (existed)
                                })
                                }
                                <div className="time">
                                    <span >Select the arriving time</span>
                                    <MyTextField
                                        value={formik.values.time}
                                        name='time'
                                        formik={formik}
                                        type="time"
                                        min={"10:00"}
                                        max="22:00"
                                    >
                                    </MyTextField>
                                </div>
                             
                                <div style={{ marginTop: '1rem' }}>
                                    <Button
                                        type="submit"
                                        disabled={!(formik.isValid && formik.values.flavors.filter(flavor => flavor).length)}
                                        variant="contained"
                                        color="success"
                                        style={{ width: "10rem", backgroundColor: "green", marginBottom: '0' }}
                                    >
                                        Go to payment
                                    </Button>
                                    <div >
                                        <h4 style={{ backgroundColor: "lightGray", display: "inline-block", margin: '0' }}>
                                            Total price: {pricesPerWeight[formik.values.weight] || 0}$
                                        </h4>
                                    </div>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </Container>
        </div>
    )
}

export default Delivery
