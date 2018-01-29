window.onload = function() {
    const main_menu_btns = {
        "new_game" : document.getElementById("new-game-btn"),
        "options" : document.getElementById("options-btn")
    };

    const option_inputs = {
        "color_scheme" : {
            "element" : document.getElementById("color-scheme-options"),
            "choices" : [
                    ['#FF6C00', '#FFA500', '#1047A9', '#009E8E', '#6A0C62'],
                    ['#D60061', '#FF5C00', '#8BEA00', '#00A779', '#3D281D'],
                    ['#206176', '#BD882E', '#654308', '#BD602E', '#652908'],
                    ['#DAEBB0', '#849E44', '#3B3F74', '#A78E48', '#813868']
                ],
            "default" : 0,
            template : function(choice, is_selected) {
                let s = is_selected ? " selected" : "";
                let i = this.choices.indexOf(choice);

                return '<option value="' + i.toString() + '"' + s + ">" + "Scheme #" + (i + 1).toString() + "</option>";
            }
        },

        "number_of_colors" : {
            "element" : document.getElementById("number-of-colors-options"),
            "choices" : [3,4,5],
            "default" : 1,
            template : function(choice, is_selected) {
                let s = is_selected ? " selected" : "";
                let i = this.choices.indexOf(choice).toString();
                
                return '<option value="' + i + '"' + s + ">" + choice + "</option>";
            }
        },

        "size" : {
            "element" : document.getElementById("size-options"),
            "choices" : [5,10,15,20],
            "default" : 1,
            template : function(choice, is_selected) {
                let s = is_selected ? " selected" : "";
                let i = this.choices.indexOf(choice).toString();
                
                return '<option value="' + i + '"' + s + ">" + choice + "</option>";
            }
        }
    };

    const other_elements = {
        "options_menu" : document.getElementById("options-menu")
    };

    function toggleOptionsMenu() {
        let div = other_elements.options_menu;

        if (div.style.display === "none" || div.style.display === "") {
            div.style.display = "block";
        }

        else {
            div.style.display = "none";
        }
    }

    function getDefault(key) {
        let opt = option_inputs[key];
        return opt.choices[opt.default];
    }

    g = new Game(
            getDefault("color_scheme"),
            getDefault("number_of_colors"),
            getDefault("size")
        );

    g.drawEverything();

    main_menu_btns.new_game.addEventListener("click", Game.prototype.restartGame.bind(g));
    main_menu_btns.options.addEventListener("click", toggleOptionsMenu);

    function drawOption(key, fun) {
        let opt = option_inputs[key];
        let s = opt.default;

        opt.element.innerHTML = opt.choices.map(c => opt.template(c, opt.choices.indexOf(c) === s)).join("");
        opt.element.addEventListener("change", function() {
            fun(opt.choices[this.value]);
        }, false);
    }

    drawOption("color_scheme", Game.prototype.changeColorScheme.bind(g));
    drawOption("number_of_colors", Game.prototype.changeNumberOfColors.bind(g));
    drawOption("size", Game.prototype.changeSize.bind(g));
};