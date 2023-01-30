

/**
 * takes a block of text and splits into paragraphs of 3 sentences
 */
export function textToParagraphs(text : string) {

    if (!text) return []

    // split text into array of sentences
    const sentencesArray: RegExpMatchArray = text.match(/\(?[^\.\?\!]+[\.!\?]\)?/g)
    // credit: https://stackoverflow.com/questions/11761563/javascript-regexp-for-splitting-text-into-sentences-and-keeping-the-delimiter

    if( !Array.isArray(sentencesArray) ) return []
    
    // Convert to array where every 3 array items into 1 string
    let paragraphArray: string[] = []
    for(let i = 0; i < sentencesArray.length; i = i + 3) {

        let paragraph: string = `${sentencesArray[i]} `
        paragraph += sentencesArray[i+1] ? `${sentencesArray[i+1]} ` : ''
        paragraph += sentencesArray[i+2] ? `${sentencesArray[i+2]}` : ''
            
        paragraphArray.push(paragraph)
    }
    return paragraphArray
}