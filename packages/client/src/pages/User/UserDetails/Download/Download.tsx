import React from 'react';
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';


// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

interface USER_DETAILS_PROPS {
}


// Create Document Component
const Download: React.FC<USER_DETAILS_PROPS> = (props): JSX.Element => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>Section #1</Text>
                </View>
                <View style={styles.section}>
                    <Text>Section #2</Text>
                </View>
            </Page>
        </Document>
    )
}

export default Download