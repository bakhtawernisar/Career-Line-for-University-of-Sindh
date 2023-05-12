import React, { useState, useEffect } from 'react'
import { TextInput, View, Text, StyleSheet } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { FONTS, COLORS, SIZES } from '../constants/theme'
import { Globalstyles } from "../styles/GlobalStyle";

const Question = ({ placeholder, value, onChange, index, style,
    question, options, }) => {
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [correctOption, setCorrect] = useState(null);
    const [neutralOption, setNeutral] = useState(null);
    const [wrongOption, setWrong] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (wrongOption || neutralOption || correctOption) {
            onChange(correctOption, 'correct_option', index)
            onChange(wrongOption, 'wrong_option', index)
            onChange(neutralOption, 'neutral_option', index)
        }

    }, [wrongOption, neutralOption, correctOption])

    return (
        <View style={style}>
            <TextInput
                style={Globalstyles.input}
                placeholder={placeholder}
                value={question}
                onChangeText={e => onChange(e, 'question', index)}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.label}>Options : </Text>
                <TextInput
                    style={styles.option}
                    value={value}
                    onChangeText={e => {
                        onChange([e, options[1], options[2]], 'options', index)
                    }}
                    onEndEditing={() => setItems([...items, { label: options[0], value: options[0] }])}
                />
                <TextInput
                    style={styles.option}
                    value={value}
                    onChangeText={e => onChange([options[0], e, options[2]], 'options', index)}
                    onEndEditing={() => setItems([...items, { label: options[1], value: options[1] }])}
                />
                <TextInput
                    style={styles.option}
                    value={value}
                    onChangeText={e => onChange([options[0], options[1], e], 'options', index)}
                    onEndEditing={() => setItems([...items, { label: options[2], value: options[2] }])}
                />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <Text style={styles.label}>Correct Option : </Text>
                <View style={{ width: '63%', zIndex: 2000000 }}>
                    <DropDownPicker

                        open={open1}
                        value={correctOption}
                        items={items}
                        setOpen={setOpen1}
                        setValue={setCorrect}
                        setItems={setItems}
                    />
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <Text style={styles.label}>Neutral Option : </Text>
                <DropDownPicker
                    containerStyle={{ width: "63%", marginLeft: 1.5 }}
                    open={open2}
                    value={neutralOption}
                    items={items}
                    zIndex={10000}
                    setOpen={setOpen2}
                    setValue={setNeutral}
                    setItems={setItems}
                />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <Text style={styles.label}>Wrong Option :  </Text>
                <DropDownPicker
                    containerStyle={{ width: "63%", marginLeft: 1.5 }}
                    zIndexInverse={10}
                    open={open3}
                    value={wrongOption}
                    items={items}
                    setOpen={setOpen3}
                    setValue={setWrong}
                    setItems={setItems}
                />
            </View>
        </View>
    )
}

export default Question

const styles = StyleSheet.create({

    option: {
        flex: 1,
        ...Globalstyles.input,
        marginLeft: 5
    },
    dropDown: {
        width: "65%",
        marginTop: 10
    },
    label: {
        color: COLORS.black,
        fontWeight: '500'
    }

});