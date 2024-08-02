/* eslint-disable jsx-a11y/alt-text */
"use client";

import { Page, Text, View, Document, StyleSheet, Font, Image} from '@react-pdf/renderer';
import { AnswerType } from '@/types/types';
import { getAnswersById } from '@/actions/interview';
import { toast } from 'sonner';
import React, { useCallback, useEffect, useState } from 'react'
import Link from 'next/link';

Font.register({
    family: 'Open Sans',
    src: 'http://fonts.gstatic.com/s/opensans/v13/cJZKeOuBrn4kERxqtaUH3aCWcynf_cDxXwCLxiixG1c.ttf'
});

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Open Sans'
    },
    author: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 18,
        margin: 12,
        fontFamily: 'Open Sans'
    },
    text: {
        margin: 12,
        fontSize: 12,
        textAlign: 'justify',
        fontFamily: 'Open Sans'
    },
    image: {
        width: 25,
        marginVertical: 15,
        marginHorizontal: 100,
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
});

function FeedbackDocument({mockId}:{mockId: string}) {
    const [interviewFeedbackDetails, setInterviewFeedbackDetails] = useState<AnswerType[]>([]);

    const getFeedbackDetails = useCallback(async () => {
        try {
            const result = await getAnswersById(mockId as string);
            setInterviewFeedbackDetails(result as AnswerType[]);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('An unknown error occurred.');
            }
            throw error;
        }
    }, [mockId]);

    const overallTotalRating = interviewFeedbackDetails.reduce((accumulator, currVal) => accumulator + currVal.overall_rating, 0);
    const aboveAverage = interviewFeedbackDetails.filter(feedback => feedback.overall_rating > 2).length;

    // Calculate the improvement percentage
    const calculateImprovementPercentage = (countAboveTwo: number, total_questions: number) => {
        return (((5 - countAboveTwo) / total_questions) * 100);
    };
    const improvementPercentage = calculateImprovementPercentage(aboveAverage, 5);

    useEffect(() => {
        getFeedbackDetails();
    }, [getFeedbackDetails, mockId]);

    return (
        <Document>
            <Page size="A4" style={styles.body}>
                <Text style={styles.header} fixed>
                    Vocara
                </Text>
                {/* <View>
                    <Link href={"/"} className="flex items-center justify-start w-[50px]">
                        <svg id="logo-38" viewBox="0 0 78 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M55.5 0H77.5L58.5 32H36.5L55.5 0Z" className="ccustom" fill="#FF7A00"></path> <path d="M35.5 0H51.5L32.5 32H16.5L35.5 0Z" className="ccompli1" fill="#FF9736"></path> <path d="M19.5 0H31.5L12.5 32H0.5L19.5 0Z" className="ccompli2" fill="#FFBC7D">
                            </path>
                        </svg>
                    </Link>
                </View> */}
                <Image
                    source="https://private-user-images.githubusercontent.com/54631653/339962118-57e43439-e6f9-4e2c-9ed3-b8d6f7b9d6f3.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjAyNjg4MzIsIm5iZiI6MTcyMDI2ODUzMiwicGF0aCI6Ii81NDYzMTY1My8zMzk5NjIxMTgtNTdlNDM0MzktZTZmOS00ZTJjLTllZDMtYjhkNmY3YjlkNmYzLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA3MDYlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNzA2VDEyMjIxMlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTdiMGIxNDQ3NTBiZjJiYzRiNzgxMWU4NzMwMWZhYzE3ZDExOTAwZmUyMDMyNGE1MmMwNWE4ZjdhODA0NzMzMzQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.wUzEZb9Aqsr1fvhksOl3GW5_ENzLtxCBYyF6M8yNQLw"
                    style={styles.image}
                />
                <Text style={styles.title}>Feedback on your </Text>
                <Text style={styles.subtitle}>
                    Capítulo I: Que trata de la condición y ejercicio del famoso hidalgo D.
                    Quijote de la Mancha
                </Text>
                <Text style={styles.text}>
                    En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha
                    mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga
                    antigua, rocín flaco y galgo corredor. Una olla de algo más vaca que
                    carnero, salpicón las más noches, duelos y quebrantos los sábados,
                    lentejas los viernes, algún palomino de añadidura los domingos,
                    consumían las tres partes de su hacienda. El resto della concluían sayo
                    de velarte, calzas de velludo para las fiestas con sus pantuflos de lo
                    mismo, los días de entre semana se honraba con su vellori de lo más
                    fino. Tenía en su casa una ama que pasaba de los cuarenta, y una sobrina
                    que no llegaba a los veinte, y un mozo de campo y plaza, que así
                    ensillaba el rocín como tomaba la podadera. Frisaba la edad de nuestro
                    hidalgo con los cincuenta años, era de complexión recia, seco de carnes,
                    enjuto de rostro; gran madrugador y amigo de la caza. Quieren decir que
                    tenía el sobrenombre de Quijada o Quesada
                </Text>
                <Text style={styles.text}>
                    Es, pues, de saber, que este sobredicho hidalgo, los ratos que estaba
                    ocioso (que eran los más del año) se daba a leer libros de caballerías
                    con tanta afición y gusto, que olvidó casi de todo punto el ejercicio de
                    la caza, y aun la administración de su hacienda; y llegó a tanto su
                    curiosidad y desatino en esto, que vendió muchas hanegas de tierra de
                    sembradura, para comprar libros de caballerías en que leer; y así llevó
                    a su casa todos cuantos pudo haber dellos; y de todos ningunos le
                    parecían tan bien como los que compuso el famoso Feliciano de Silva:
                    porque la claridad de su prosa, y aquellas intrincadas razones suyas, le
                    parecían de perlas; y más cuando llegaba a leer aquellos requiebros y
                    cartas de desafío, donde en muchas partes hallaba escrito: la razón de
                    la sinrazón que a mi razón se hace, de tal manera mi razón enflaquece,
                    que con razón me quejo de la vuestra fermosura, y también cuando leía.
                </Text>
            </Page>
        </Document>
    )
}

export default FeedbackDocument