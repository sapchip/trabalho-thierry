import React, { useState } from "react";
import { TextInput, View, Text, TouchableOpacity, Vibration } from
    "react-native";
import ResultImc from "./ResultMedia";
import styles from "./styles";


export default function Form() {
    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [messageImc, setMessageImc] = useState("Preencha o Peso e Altura");
    const [imc, setImc] = useState(null);
    const [textButton, setTextButton] = useState("Calcular");
    const [errorMessage, setErrorMessage] = useState(null);
    
    function imcCalculator() {
        return setImc((weight / (height * height)).toFixed(2))
    }


    /*------------------------------------------------------------------- */
    function verificationImc() {
        if (imc == null) {
            setErrorMessage("*Campo Obrigatório")
            Vibration.vibrate()
        }
    }
    /*-------------------------------------------------------------------*/
    function validationImc() {
        if (weight != null && height != null) {
            imcCalculator()
            setHeight(null)
            setWeight(null)
            setErrorMessage(null)
            setMessageImc(" Seu Imc é igual a: ")
            setTextButton("Calcular Novamente")
            return
        }
        setImc(null)
        setTextButton("Calcular")
        setMessageImc("Preencha o Peso e Altura para Calcular!")
        verificationImc()
    }

    return (
        <View style={styles.formContext}>
            <View style={styles.form}>
                <Text style={styles.label}>Altura</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput style={styles.input} onChangeText={setHeight}
                    value={height} placeholder="Ex: 1.90" keyboardType="numeric" />
                <Text style={styles.label}>Peso</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput style={styles.input} onChangeText={setWeight}
                    value={weight} placeholder="Ex: 90" keyboardType="numeric" />
                <TouchableOpacity style={styles.buttonCalculator} onPress={() =>
                    validationImc()}>
                    <Text
                        style={styles.textButtonCalculator}>{textButton}</Text></TouchableOpacity
                >
            </View>
            <ResultImc messageResultImc={messageImc} resultImc={imc} />
      </View>
    );
}