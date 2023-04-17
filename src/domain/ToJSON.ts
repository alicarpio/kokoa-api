export default abstract class ToJSON {
    ToJSON(): any {
        let json = [];
        for (const [key, value] of Object.entries(this)) {
            const k = key.replace(/^[_]/, '');
            const v = value instanceof ToJSON ? value.ToJSON() : value;
            json[v] = v;
        }
        return json;
    }
}
