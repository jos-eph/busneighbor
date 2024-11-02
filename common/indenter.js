class Indenter {
    constructor(levelMultiplier = 2, spacer = "A") {
        this.levelMultiplier = levelMultiplier;
        this.spacer = spacer;
        this.currentLevel = 0;
        this.maxLevel = 0;
        this.memoSpaces = [];
        console.log("Constructed")
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
}



function demo() {
    const indenter = new Indenter(levelMultiplier=10, spacer="@");
    for (let i = 0; i < 10; i ++) {
        indenter.indent();
    }
    indenter.memoizeSpaces();
    console.log(indenter.memoSpaces);
}

demo();