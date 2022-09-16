let min = document.getElementById("minimum");
let max = document.getElementById("maximum");
let display = document.getElementById("output-display");

let numbers = 10;

function getPatterns() {
    let minimum = min.value;
    let maximum = max.value;
    display.innerText = stylesPattern(minimum, maximum);
}
function total(visited, matrix, cur, nextElement) {
    if (nextElement <= 0) {
        if(nextElement == 0)
          return 1;
        else
          return 0;
    }

    let patterns = 0;
    visited[cur] = true;

    for (let i = 1; i < numbers; i++)
    {
        if (!visited[i] && (matrix[i][cur] == 0 || visited[matrix[i][cur]]))
        {
            patterns += total(visited, matrix, i, nextElement - 1);
        }
    }
    visited[cur] = false;

    return patterns;
}


function stylesPattern(minimum, maximum) {
    let matrix = new Array(numbers);
    for (let i = 0; i < numbers; i++) {
        matrix[i] = new Array(numbers);
        for (let j = 0; j < numbers; j++) {
            matrix[i][j] = 0;
        }
    }
    matrix[1][3] = matrix[3][1] = 2;
    matrix[7][9] = matrix[9][7] = 8;
    matrix[1][7] = matrix[7][1] = 4;
    matrix[3][9] = matrix[9][3] = 6;
    matrix[1][9] = matrix[9][1] = matrix[2][8] = matrix[8][2] = matrix[3][7] = matrix[7][3] = matrix[4][6] = matrix[6][4] = 5;
    let visited = new Array(numbers);
    let patterns = 0;
    for (let i = minimum; i <= maximum; i++) {
        patterns += 4 * total(visited, matrix, 1, i - 1);
        patterns += 4 * total(visited, matrix, 2, i - 1);
        patterns += total(visited, matrix, 5, i - 1);
    }
    return patterns;
}