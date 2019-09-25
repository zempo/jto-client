import React, { useState, useEffect } from "react";
import { Page, Text, View, Document, StyleSheet, Font, Image as IMG } from "@react-pdf/renderer";
import "../../../Routes/css/Download.css";
// import { JtoSection } from "../Utils";
// {
//   family: "'Great Vibes', cursive",
//   src: "https://fonts.gstatic.com/s/greatvibes/v7/RWmMoKWR9v4ksMfaWd_JN9XFiaEoDmlr.ttf"
// }

Font.register({
  family: "'Amatic SC', cursive",
  src: "http://fonts.gstatic.com/s/amaticsc/v13/TUZyzwprpvBS1izr_vOECuSaU5cP1Q.ttf"
});

// Font.register({
//   family: "Oswald",
//   src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf"
// });

const Indie = ({ card, styles, size }) => {
  const [allStyles, setAllStyles] = useState({});
  useEffect(() => {
    let newStyle = StyleSheet.create({
      page: {
        fontFamily: "'Amatic SC', cursive"
      },
      view: {
        border: styles.border,
        height: styles.height,
        width: styles.width
      }
    });
    setAllStyles(newStyle);
  }, [allStyles, card, styles]);

  const frontStyles = StyleSheet.create({});

  let innerLeftStyles = StyleSheet.create({});

  let innerRightStyles = StyleSheet.create({});
  return (
    <Document style={allStyles}>
      <Page className="export-pg export-front" style={allStyles.page} size="Letter" wrap>
        <View style={allStyles.view}>
          <Text>{card.front_message}</Text>
          {card.front_image ? <IMG source={card.front_image}></IMG> : null}
        </View>
      </Page>
      <Page className="export-pg export-inside-left" size="Letter" wrap>
        <View style={allStyles.view}>
          <Text>{card.inside_message}</Text>
        </View>
      </Page>
      <Page className="export-pg export-inside-right" size="Letter" wrap>
        <View style={allStyles.view}>{card.inside_image ? <IMG source={card.inside_image}></IMG> : null}</View>
      </Page>
    </Document>
  );
};

export default Indie;

// const styles = StyleSheet.create({
//   page: {
//     backgroundColor: "#ffffff"
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1
//   },
//   movieContainer: {
//     backgroundColor: "#f6f6f5",
//     display: "flex",
//     flexDirection: "row",
//     padding: 5
//   },
//   movieDetails: {
//     display: "flex",
//     marginLeft: 5
//   },
//   movieTitle: {
//     fontSize: 15,
//     marginBottom: 10
//   },
//   movieOverview: {
//     fontSize: 10
//   },

//   image: {
//     height: 200,
//     width: 150
//   },
//   subtitle: {
//     display: "flex",
//     justifyContent: "space-between",
//     flexDirection: "row",
//     width: 150,
//     alignItems: "center",
//     marginBottom: 12
//   },
//   vote: {
//     display: "flex",
//     flexDirection: "row"
//   },
//   rating: {
//     height: 10,
//     width: 10
//   },
//   vote_text: {
//     fontSize: 10
//   },
//   vote_pop: {
//     fontSize: 10,
//     padding: 2,
//     backgroundColor: "#61C74F",
//     color: "#fff"
//   },
//   vote_pop_text: {
//     fontSize: 10,
//     marginLeft: 4
//   },
//   overviewContainer: {
//     minHeight: 110
//   },
//   detailsFooter: {
//     display: "flex",
//     flexDirection: "row"
//   },
//   lang: {
//     fontSize: 8,
//     fontWeight: 700
//   },
//   vote_average: {
//     fontSize: 8,
//     marginLeft: 4,
//     fontWeight: "bold"
//   }
// });

// export function PdfDocument(props) {
//   console.log("pdf props", props.data);
//   return (
//     <Document>
//       <Page style={styles.page}>
//         {props.data
//           ? props.data.map((a, index) => {
//               return (
//                 <View key={index} style={styles.movieContainer}>
//                   <Image
//                     style={styles.image}
//                     source={
//                       a.poster_path !== null
//                         ? `${POSTER_PATH}${a.poster_path}`
//                         : "150.jpg"
//                     }
//                   />
//                   <View style={styles.movieDetails}>
//                     <Text style={styles.movieTitle}>{a.title}</Text>
//                     <View style={styles.subtitle}>
//                       <View style={styles.vote}>
//                         <Image source="star.png" style={styles.rating} />
//                         <Text style={styles.vote_text}>{a.vote_count}</Text>
//                       </View>
//                       <View style={styles.vote}>
//                         <Text style={styles.vote_pop}>{a.popularity}</Text>
//                         <Text style={styles.vote_pop_text}>Popularity</Text>
//                       </View>
//                     </View>
//                     <View style={styles.overviewContainer}>
//                       <Text style={styles.movieOverview}>{a.overview}</Text>
//                     </View>
//                     <View style={styles.detailsFooter}>
//                       <Text style={styles.lang}>
//                         Language: {a.original_language.toUpperCase()}
//                       </Text>
//                       <Text style={styles.vote_average}>
//                         Average Votes: {a.vote_average}
//                       </Text>
//                       <Text style={styles.vote_average}>
//                         Release Date:{" "}
//                         {moment(a.release_date, "YYYY-MM-DD").format(
//                           " MMMM D Y"
//                         )}
//                       </Text>
//                     </View>
//                   </View>
//                 </View>
//               );
//             })
//           : ""}
//       </Page>
//     </Document>
//   );
// }
