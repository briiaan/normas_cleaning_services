// CONVERTS JSON ENTRY TO AN ARRAY WITHOUT THE KEY {1: one} => [one]
export function JSONToArrayWithoutKey(obj: Object, sec: string): Array<string> {
    let arr: Array<any> = [];
    for (const [key, value] of Object.entries(obj[sec])) {
        arr.push(value)
    }
    return arr
}

// SANITIZE TEXT INPUT FROM CONTACT FORM
export function sanitize(string: string) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        "/": '&#x2F;',
    };
    const reg = /[&<>"'/]/ig;
    return string.replace(reg, (match: string)=>(map[match]));
  }