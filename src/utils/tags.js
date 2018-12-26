const extractTags = (text) => {
    const tags = text.match(/(^|\s)(#[A-Za-z\d-]+)/ig);

    return tags ? tags.map(item => item.trim()) : [];
};

export const tagsParser = value => {
    const tags = extractTags(value);
    const text = tags.reduce((textRes, tag) => textRes.replace(tag, ''), value);

    return {
        text,
        tags
    };
};
