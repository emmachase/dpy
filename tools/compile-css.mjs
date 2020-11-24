import sass from "sass";
import { writeFileSync } from "fs";

const result = sass.renderSync({
    file: "src/web/styles/main.scss"
});

writeFileSync("public/styles.css", result.css);
