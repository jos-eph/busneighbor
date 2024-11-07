class IndentedBlock {
    constructor(text, levels) {
        this.text = text;
        this.levels = levels;
    }
}

class Indenter {
    constructor(levelMultiplier = 2, spacer = "A") {
        this.levelMultiplier = levelMultiplier;
        this.spacer = spacer;
        this.currentLevel = 0;
        this.maxLevel = 0;
        this.memoSpaces = [];
        this.storedBlocks = [];
        this.newLine = "\n";
    }

    indent = () => {
        this.currentLevel += 1;
        if (this.currentLevel > this.maxLevel) {
            this.maxLevel = this.currentLevel;
        }
    }

    outdent = () => {
        if (this.currentLevel === 0) {
            return;
        }

        this.currentLevel -= 1;
    }

    memoizeSpaces = () => {
        this.memoSpaces = [];
        for (let level = 0; level <= this.maxLevel; level++) {
            const repetitions = this.levelMultiplier * level;
            this.memoSpaces[level] = this.spacer.repeat(repetitions); // Store repeated '#' directly
        }
    }

    place(text) {
        this.storedBlocks.push(new IndentedBlock(text, this.currentLevel));
    }

    placeRight(text) {
        this.indent();
        this.place(text);
    }

    placeLeft(text) {
        this.outdent();
        this.place(text);
    }

    getFormatted() {
        this.memoizeSpaces();
        let formattedText = "";
        for (let block of this.storedBlocks) {
            formattedText += this.memoSpaces[block.levels] + block.text + this.newLine;
        }
        return formattedText;
    }

    setLevelMultiplier(multiplier) {
        this.levelMultiplier = multiplier;
    }
 

}


export { Indenter };