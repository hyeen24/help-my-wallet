import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext';
import { AntDesign } from '@expo/vector-icons';
import { DropdownProps } from '@/types';

const Dropdown = ({
    defaultValue,
    displayText="",
    options,
    selected,
    setSelected,
    style,
} : DropdownProps ) => {
    const { theme } = useTheme();
    const [ expanded, setExpanded ] = useState(false);
    const [ position, setPosition ] = useState({ x: 0, y: 0, width: 0, height: 0 });

    const toggleExpanded= useCallback(()=> {
        if (!expanded && buttonRef.current) {
            buttonRef.current.measureInWindow((x, y, width, height) => {
            setPosition({ x, y, width, height });
            });
        }
        setExpanded(!expanded)
    },[expanded])
    const buttonRef = useRef<View>(null);

  return (
    <View ref={buttonRef} style={style}>
        <TouchableOpacity style={styles.button} onPress={toggleExpanded}>
            <Text style={[styles.text, { color: theme.textColor }]}>
            { displayText? displayText : selected}
            </Text>
            <AntDesign name={expanded ? "caret-up" : "caret-down"} color={theme.textColor} />
        </TouchableOpacity>

        {expanded && (
            <Modal visible={expanded} transparent>
            <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
                <View style={styles.backdrop}>
                <View
                    style={[
                    styles.options,
                    {
                        top: position.y + position.height,
                        left: position.x,
                        width: position.width,
                        backgroundColor: theme.inactiveCardColors,
                    },
                    ]}
                >
                    <FlatList
                    data={options}
                    renderItem={({ item }) => (
                        <TouchableOpacity activeOpacity={0.8} onPress={() => {
                            setSelected(item);
                            setExpanded(!expanded);
                        }}>
                        <Text style={{color: theme.textColor}}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => <View style={styles.seperator} />}
                    ListEmptyComponent={() => (
                            <Text style={{ color: theme.textColor, textAlign: 'center', padding: 20 }}>
                                No options available
                            </Text>
                        )}
                    />
                </View>
                </View>
            </TouchableWithoutFeedback>
            </Modal>
        )}
        </View>
  )
}
export default Dropdown

const styles = StyleSheet.create({
    backdrop: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    }
    ,
    seperator: {
        height: 10
    },
    optionItems : {
        justifyContent: 'center',
        
    },
    options: {
        position: "absolute",
        padding:10,
        borderRadius: 6
    },
    text: {
        fontSize: 14,
        opacity: 0.8
    },
    button: {
        justifyContent: 'space-between',
        borderRadius: 8,
        gap: 8,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
    }
})