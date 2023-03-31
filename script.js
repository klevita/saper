class Block {
  constructor() {
    this.hasBomb = Math.random() < 0.14;
    this.count = 0;
    this.state = "closed";
  }
  checkState(i, j) {
    console.log(this.count);
    if (this.hasBomb) {
      alert("blown u fool");
      init()
    } else {
      if (this.count === 0) {
        recursiveOpen(i, j);
      }
      this.state = "opened";
      render();
    }
  }
}
let els = [];
for (let i = 0; i < 20; i++) {
  els.push([]);
  for (let j = 0; j < 20; j++) {
    els[i].push(new Block());
  }
}

function recursiveOpen(i, j) {
  if (els[i][j].state === "opened") {
    return;
  }
  els[i][j].state = "opened";
  if (i < 19) {
    if (!els[i + 1][j].hasBomb) {
      if (!els[i + 1][j].count) {
        recursiveOpen(i + 1, j);
      } else {
        els[i + 1][j].state = "opened";
      }
    }
  }
  if (j < 19) {
    if (!els[i][j + 1].hasBomb) {
      if (!els[i][j + 1].count) {
        recursiveOpen(i, j + 1);
      } else {
        els[i][j + 1].state = "opened";
      }
    }
  }
  if (i > 0) {
    if (!els[i - 1][j].hasBomb) {
      if (!els[i - 1][j].count) {
        recursiveOpen(i - 1, j);
      } else {
        els[i - 1][j].state = "opened";
      }
    }
  }
  if (j > 0) {
    if (!els[i][j - 1].hasBomb) {
      if (!els[i][j - 1].count) {
        recursiveOpen(i, j - 1);
      } else {
        els[i][j - 1].state = "opened";
      }
    }
  }

  if (i < 19 && j < 19) {
    if (!els[i + 1][j + 1].hasBomb) {
      if (!els[i + 1][j + 1].count) {
        recursiveOpen(i + 1, j + 1);
      } else {
        els[i + 1][j + 1].state = "opened";
      }
    }
  }
  if (i > 0 && j < 19) {
    if (!els[i - 1][j + 1].hasBomb) {
      if (!els[i - 1][j + 1].count) {
        recursiveOpen(i - 1, j + 1);
      } else {
        els[i - 1][j + 1].state = "opened";
      }
    }
  }
  if (i > 0 && j > 0) {
    if (!els[i - 1][j - 1].hasBomb) {
      if (!els[i - 1][j - 1].count) {
        recursiveOpen(i - 1, j - 1);
      } else {
        els[i - 1][j - 1].state = "opened";
      }
    }
  }
  if (i < 19 && j > 0) {
    if (!els[i + 1][j - 1].hasBomb) {
      if (!els[i + 1][j - 1].count) {
        recursiveOpen(i + 1, j - 1);
      } else {
        els[i + 1][j - 1].state = "opened";
      }
    }
  }
}
function init() {
  els.forEach((v, i) => {
    v.forEach((val, j) => {
      if (val.hasBomb) {
        if (i < 19)
          if (!els[i + 1][j]?.hasBomb) {
            els[i + 1][j].count++;
          }

        if (i < 19 && j > 0)
          if (!els[i + 1][j - 1]?.hasBomb && els[i + 1][j - 1] !== undefined) {
            els[i + 1][j - 1].count++;
          }

        if (j > 0)
          if (!els[i][j - 1]?.hasBomb && els[i][j - 1] !== undefined) {
            els[i][j - 1].count++;
          }

        if (i > 0 && j > 0)
          if (!els[i - 1][j - 1]?.hasBomb && els[i - 1][j - 1] !== undefined) {
            els[i - 1][j - 1].count++;
          }

        if (i > 0)
          if (!els[i - 1][j]?.hasBomb && els[i - 1][j] !== undefined) {
            els[i - 1][j].count++;
          }

        if (i > 0 && j < 19)
          if (!els[i - 1][j + 1]?.hasBomb && els[i - 1][j + 1] !== undefined) {
            els[i - 1][j + 1].count++;
          }

        if (j < 19)
          if (!els[i][j + 1]?.hasBomb && els[i][j + 1] !== undefined) {
            els[i][j + 1].count++;
          }

        if (i < 19 && j < 19)
          if (!els[i + 1][j + 1]?.hasBomb && els[i + 1][j + 1] !== undefined) {
            els[i + 1][j + 1].count++;
          }
      }
    });
  });
  render();
}
function render() {
  container.innerHTML = "";
  els.forEach((v, i) => {
    v.forEach((val, j) => {
      const el = document.createElement("div");
      el.classList.add(val.state);
      el.classList.add("base");
      if (!val.hasBomb) {
        if (val.count) el.innerHTML = "" + val.count;
      } else {
        el.innerHTML = "*";
      }
      container.appendChild(el);
      el.addEventListener("click", () => {
        els[i][j].checkState(i, j);
      });
    });
  });
}
let container = document.getElementById("container");
init();
