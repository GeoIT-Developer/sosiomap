export function changeImgSrc(
    htmlString: string,
    newBaseUrl: string = 'https://infopemilu.kpu.go.id',
) {
    // Use a regular expression to match the src attribute in img tags
    const regex = /<img[^>]*\ssrc=["'](.*?)["']/g;

    // Replace the matched src attributes with the new base URL
    const modifiedHtml = htmlString.replace(regex, function (match, src) {
        const newSrc = newBaseUrl + '/' + src;
        return match.replace(src, newSrc);
    });

    const modifiedHtmlString = modifiedHtml.replace(
        '<img',
        '<img height="100"',
    );
    return modifiedHtmlString;
}

export function addBaseUrlToFormAction(
    htmlString: string,
    baseUrl: string = 'https://infopemilu.kpu.go.id/Pemilu',
) {
    // Use a regular expression to match the action attribute in form tags
    const regex = /<form[^>]*\saction=["'](.*?)["']/g;

    // Replace the matched action attributes with the new base URL
    let modifiedHtml = htmlString.replace(regex, function (match, action) {
        const newAction = baseUrl + '/' + action;
        return match.replace(action, newAction);
    });

    // Add target="_blank" to the form tag
    modifiedHtml = modifiedHtml.replace(/<form/g, '<form target="_blank"');

    return modifiedHtml;
}

export function getDapilFromString(inputString: string): string {
    // Split the input string into words
    const words = inputString.split(' ');

    // Get the last word
    const lastWord = words[words.length - 1];

    // Extract numbers from the last word
    const numbers = lastWord.match(/\d+/);

    if (numbers) {
        // Convert the matched number to a string with leading zero
        const numberWithLeadingZero = numbers[0].padStart(2, '0');
        return numberWithLeadingZero;
    }

    // Return default value if no number is found
    return '00';
}
