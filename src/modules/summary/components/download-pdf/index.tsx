import { Page, Document, StyleSheet, View, Text,Image } from '@react-pdf/renderer';
import { SummaryItem } from '@/modules/summary/model';
import { ChangeFormattedDate } from '../../utils';
import copyRight from '@/assets/copyright.png'



interface IDownloadPdfProps {
  summary: SummaryItem | null;
  locale: string;
}

const DownlaodPdf = ({ summary,locale }: IDownloadPdfProps) => {
  
  
  const styles = StyleSheet.create({
    page: {
      backgroundColor: '#000',
      paddingTop: 15,
      paddingBottom: 15,
    },
    summary: {
      marginTop: 20,
      paddingHorizontal: 15,
      paddingBottom: 17,
      border: '1px solid grey',
      marginLeft: 15,
      marginRight: 15,
      backgroundColor: '#161712',
    },
    todo: {
      marginTop: 25,
      marginLeft: 15,
      marginRight: 15,
    },
    todoCard: {
      padding: 15,
      border: '1px solid grey',
      marginTop: 10,
      backgroundColor: '#161712',
      paddingBottom: 8,
    },
    copyrightContainer: {
      marginTop: 25,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontSize: '10px',
      fontWeight: 'medium',
    },
    copyrightImage: {
      width: 12,
      height: 12,
      marginRight: 3, 
    },
  });

  return (
    <Document>
      <Page
        size='A4'
        style={styles.page}
      >
        <View style={{ display: 'flex', flexDirection: 'column' }}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 25,
                border: '1px solid grey',
                marginTop: 25,
                marginLeft: 15,
                marginRight: 15,
                backgroundColor: '#161712',
              }}
            >
              <View style={{ color: 'white', marginBottom: '5' }}>
                <Text style={{ fontWeight: 'bold' }}>{summary?.title}</Text>
              </View>
              <View style={{ color: 'white', marginBottom: '5' }}>
                <Text style={{ fontWeight: 'bold' }}>
                  {ChangeFormattedDate(summary?.created_at)}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ marginTop: 25, color: 'white' }}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 5,
                marginLeft: 15,
                marginRight: 15,
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: 'white',
                }}
              >
                {locale == 'en' ? 'Summary' : 'Zusammenfassung'}
              </Text>
              <View
                style={{
                  borderBottom: '1px solid grey',
                  width: locale =='en' ? '16% ' : '30% ',
                  margin: 'auto',
                }}
              ></View>
            </View>
            <View style={styles.summary}>
              <Text
                style={{
                  fontSize: '12px',
                  fontWeight: 'normal',
                  textAlign: 'justify',
                  letterSpacing: '0.5px',
                  marginTop: 15,
                }}
              >
                {summary?.summary}
              </Text>
            </View>
          </View>
          <View style={styles.copyrightContainer}>
            <Image
              src={copyRight}
              style={styles.copyrightImage}
            />
            <Text>{`${locale == 'en' ? 'Copyright Justagile' : 'Urheberrecht Justagile'}`}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default DownlaodPdf;
