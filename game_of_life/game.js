let x = 45;
let y = 30;

function clickCell(ev){
  let $clickedCell = $(ev.target);
  if($clickedCell.hasClass('live')){
    $clickedCell.removeClass('live');
  } else {
    $clickedCell.addClass('live');
  }
  let y = ev.target.parentNode.rowIndex;
  let x = ev.target.cellIndex;
}

function getCell(j, i){
  return $('#cell_' + j + '_' + i)
}

function getNeighbors(j, i){
  let y = i;
  let x = j;
  let $nw = getCell(x-1, y-1);
  let $n = getCell(x, y-1);
  let $ne = getCell(x+1, y-1);
  let $w = getCell(x-1, y);
  let $e = getCell(x+1, y);
  let $sw = getCell(x-1, y+1);
  let $s = getCell(x, y+1);
  let $se = getCell(x+1, y+1);
  return [$nw, $n, $ne, $w, $e, $sw, $s, $se];
}

function liveNeighborCount(j, i){
  // let i = clickedCell.parentNode.rowIndex;
  // let j = clickedCell.cellIndex;
  // let $cell = getCell(j, i);
  let count = 0;
  let neighbors = getNeighbors(j, i);
  for(let i = 0; i < neighbors.length; i++){
    if(neighbors[i].hasClass('live')){
      count++;
    }
  }
  return count
}

function gameBoardSetup(x, y){
  let $board = $('<table>');
  for(var i = 0; i < y; i++){
    let $row = $('<tr>');
    $board.append($row);
    for(var j = 0; j < x; j++){
      let $cell = $('<td>');
      $row.append($cell);
      $cell.attr('id', 'cell_' + j + '_' + i);
      $cell.on('click', clickCell);
    }
  }
  $('#gameBoard').append($board);
}

function checkCells(x, y){
  for(var i = 0; i < y; i++){
    for(var j = 0; j < x; j++){
      let $cell = getCell(j, i);
      let liveNeighbors = liveNeighborCount(j, i);
      if($cell.hasClass('live')){
        if(liveNeighbors < 2 || liveNeighbors > 3){
          $cell.addClass('dead_pending')
        }
      } else {
        if(liveNeighbors === 3){
          $cell.addClass('live_pending')
        }
      }
    }
  }
}

function updateCells(x, y){
  checkCells(x, y);
  for(var i = 0; i < y; i++){
    for(var j = 0; j < x; j++){
      let $cell = getCell(j, i);
      if($cell.hasClass('dead_pending')){
        $cell.removeClass('live');
        $cell.removeClass('dead_pending')
      } if($cell.hasClass('live_pending')){
        $cell.addClass('live');
        $cell.removeClass('live_pending');
      }
    }
  }
}

// function main(x, y){
//   gameBoardSetup(x, y);
//   updateCells(x, y);
// }

// let $startButton = $('<button type="button">Start</button')
//
// $startButton
gameBoardSetup(x, y);
