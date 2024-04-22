
export function QueryJson(req){
    const searchParams = req.nextUrl.search;
    const queryString = searchParams.split('?')[1];
    const params = new URLSearchParams(queryString);
    const json = {};
    
    params.forEach((value, key) => {
      if (json[key] === undefined) {
        json[key] = value;
      } else {
        if (!Array.isArray(json[key])) {
          json[key] = [json[key]];
        }
        json[key].push(value);
      }
    });
    
    return json;
}
