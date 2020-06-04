import { createIconSet } from '@expo/vector-icons';
const glyphMap = require(`../../assets/fonts/Remixicon/glyp.json`);
const expoAssetId = require("../../assets/fonts/Remixicon/remixicon.ttf");
const Icon = createIconSet(glyphMap, 'remixicon', expoAssetId);
export default Icon;