import React, { Component } from 'react';
import d3 from '../d3';
import { db } from '../../firebase';



class Grid extends Component {
    constructor(props) {
       super(props);
  
       this.state = {
        properties: { boxSize: 50 },
        startTime: Date.now(),
        gameKey:this.props.gameKey,
        words:this.props.words.map(function(x){ return x.name.toUpperCase() }),
      //  words: ['Maebh', 'Orlaith', 'Aoife','Caroline','finbar'].map(function(x){ return x.toUpperCase() }),
        properties : { boxSize: 50 },
        boxSize : 50,
        windowWidth :( window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth) - (( window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth)/15),
widthModifier : (( window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth)/15 < 1000) ? 1 : 2
       };
      // this.getLetters = this.getLetters.bind(this);
      this.createGrid = this.createGrid.bind(this);
      this.genGrid = this.genGrid.bind(this);
      this.draw = this.draw.bind(this);
      this.getLetters = this.getLetters.bind(this);
      this.checkResult = this.checkResult.bind(this);

     }
     getLetters(path, gridData) {
        let properties = this.state.properties
        let points = []
        let line = path.node().getBBox()
        let totalLength = path.node().getTotalLength()
        let startPoint = path.node().getPointAtLength(0)
        let endPoint = path.node().getPointAtLength(totalLength)
        let startX = Math.floor((startPoint.x - 1) / properties.boxSize)
        let startY = Math.floor((startPoint.y - 1) / properties.boxSize)
        let endx = Math.floor((endPoint.x - 1) / properties.boxSize)
        let endy = Math.floor((endPoint.y - 1) / properties.boxSize)
        // if (startX === endx || startY === endy || (endy - startY) / (endx - startX) === 1) {
        //     console.log('good')
        // }
        if (startX === endx && startY === endy) {
            return gridData[startY][startX].text
        }
        if (startX > endx) {
            let tempx
            tempx = startX
            startX = endx
            endx = tempx
            let tempy
            tempy = startY
            startY = endy
            endy = tempy
        }
        let selectedLetters = ""
        if ((endy - startY) / (endx - startX) === 1) {
            for (let i = startX; i <= endx; i++) {
                let yIncrement = (endx === startX) ? 0 : (endy - startY) / (endx - startX)
                let Ycoord = startY + (yIncrement * (i - startX))
    
                selectedLetters += gridData[Ycoord][i].text
            }
        }
        if ((endy - startY) / (endx - startX) === -1) {
            for (let i = startX; i <= endx; i++) {
                let yIncrement = (endx === startX) ? 0 : (endy - startY) / (endx - startX)
                let Ycoord = startY + (yIncrement * (i - startX))
    
                selectedLetters += gridData[Ycoord][i].text
            }
        }
        if (startX === endx) {
            for (let i = startY; i <= endy; i++) {
                selectedLetters += gridData[i][startX].text
            }
        }
        if (startY === endy) {
            for (let i = startX; i <= endx; i++) {
                selectedLetters += gridData[startY][i].text
            }
        }
        return selectedLetters
    }
createGrid(words, padding) {
        let windowWidth = this.state.windowWidth
        let widthModifier =  this.state.widthModifier
        let properties =  this.state.properties
        let largestWord = words.reduce(function (a, b) { return a.length > b.length ? a : b; });
        let gridCellNumber = largestWord.length + padding;
        if ((windowWidth / widthModifier) < (gridCellNumber * properties.boxSize)) {
            properties.boxSize = Math.floor(windowWidth / widthModifier) / gridCellNumber
        }
        var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
        var ypos = 1;
        var width = properties.boxSize;
        var height = properties.boxSize;
        var click = 0;
    
        const letters = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase()
        const orientations = ['horizontal', 'vertical', 'diagonaldown', 'diagonalup']
        const wordGrid = []
        // initialise grid
        for (let i = 0; i < gridCellNumber; i++) {
            wordGrid.push([])
            for (let j = 0; j < gridCellNumber; j++) {
                wordGrid[i][j] = {
                    x: xpos,
                    y: ypos,
                    width: properties.boxSize,
                    height: properties.boxSize,
                    click: click,
                    text: '0'
                }
                xpos += width
            }
            xpos = 1
            ypos += height
        }
    
        // add words
        let counter = 0
        let startingCol, startingRow, cursor
        for (let i = 0; i < words.length; i++) {
            let orientation = orientations[i % orientations.length]
            let currentWord = words[i]
            if (counter > gridCellNumber * 2) {
                orientation = orientations[counter % orientations.length]
                console.log('orent', orientation)
            }
            if (counter > gridCellNumber * 8) {
                return false
            }
            switch (orientation) {
                case 'horizontal':
                    startingCol = Math.floor(Math.random() * (gridCellNumber - words[i].length))
                    startingRow = Math.floor(Math.random() * gridCellNumber)
                    cursor = i
                    for (let j = 0; j < words[i].length; j++) {
                        if (wordGrid[startingRow][startingCol + j].text != '0' && wordGrid[startingRow][startingCol + j].text != words[i][j]) {
                            i--
                            break
                        }
                    }
                    counter++
                    if (cursor == i) {
                        for (let j = 0; j < words[i].length; j++) {
                            wordGrid[startingRow][startingCol + j].text = words[i][j]
                        }
                        counter = 0
                    }
                    break;
                case 'vertical':
                    startingRow = Math.floor(Math.random() * (gridCellNumber - words[i].length))
                    startingCol = Math.floor(Math.random() * gridCellNumber)
                    cursor = i
                    for (let j = 0; j < words[i].length; j++) {
                        if (wordGrid[startingRow + j][startingCol].text != '0' && wordGrid[startingRow + j][startingCol].text != words[i][j]) {
                            i--
                            break
                        }
    
                    }
                    counter++
                    if (cursor == i) {
                        counter = 0
                        console.log('vert', words[i])
                        for (let j = 0; j < words[i].length; j++) {
                            wordGrid[startingRow + j][startingCol].text = words[i][j]
                        }
                    }
                    break;
                case 'diagonaldown':
                    startingRow = Math.floor(Math.random() * (gridCellNumber - words[i].length))
                    startingCol = Math.floor(Math.random() * (gridCellNumber - words[i].length))
                    cursor = i
                    for (let j = 0; j < words[i].length; j++) {
                        if (wordGrid[startingRow + j][startingCol + j].text != '0' && wordGrid[startingRow + j][startingCol + j].text != words[i][j]) {
                            i--
                            break
                        }
                    }
                    counter++
                    if (cursor == i) {
                        counter = 0
                        console.log('dia', words[i])
                        for (let j = 0; j < words[i].length; j++) {
                            wordGrid[startingRow + j][startingCol + j].text = words[i][j]
                        }
                    }
                    break;
    
                case 'diagonalup':
                    startingRow = Math.floor(Math.random() * (gridCellNumber - words[i].length)) + words[i].length - 1
                    startingCol = Math.floor(Math.random() * (gridCellNumber - words[i].length))
                    cursor = i
                    for (let j = 0; j < words[i].length; j++) {
                        if (wordGrid[startingRow - j][startingCol + j].text != '0' && wordGrid[startingRow - j][startingCol + j].text != words[i][j]) {
                            i--
                            break
                        }
                    }
                    counter++
                    if (cursor == i) {
                        counter = 0
                        console.log('dia', words[i])
                        for (let j = 0; j < words[i].length; j++) {
                            wordGrid[startingRow - j][startingCol + j].text = words[i][j]
                        }
                    }
                    break;
            }
        }
    
        //fill in the blanks
        for (let i = 0; i < gridCellNumber; i++) {
            for (let j = 0; j < gridCellNumber; j++) {
                if (wordGrid[i][j].text === '0') {
                    wordGrid[i][j].text = letters.charAt(Math.floor(Math.random() * letters.length))
                }
            }
        }
        console.log('wordGrid', wordGrid)
        //  properties.boxSize=20
        return wordGrid
    }
    
 genGrid(words) {
        for (let i = 0; i < 8; i++) {
            let grid = this.createGrid(words, i)
            if (grid) {
                return grid
            }
    
        }
    }
    

checkResult(path, gridData) {
        let words = this.state.words
        let startTime = this.state.startTime
        let selectedLetters = this.getLetters(path, gridData)
        let wordIndex = words.indexOf(selectedLetters)
        if (wordIndex === -1) {
            path.remove();
        } else {
            //document.querySelector('.wl_' + selectedLetters).classList.add("strike");
            this.props.strikeoutWord(selectedLetters);
            words.splice(wordIndex, 1)
            console.log(words.length)
            if (words.length===0){
                let totalTime=Math.floor((Date.now()-startTime)/1000)
                console.log('finished, you took '+ totalTime+ " seconds")
                db.doGameComplete(this.state.gameKey,totalTime)
                .then(() => {
                    console.log('finished, you took '+ totalTime+ " seconds")
                })
                .catch(error => {
                    console.log('err')
                });


            //    $('#totalTime').text(totalTime)
            //    $('#myModal').modal('show');
            }
            path.style.stroke = 'green'
        }
        // console.log(selectedLetters)
        // d3.select(`.x${startX}-y${startY}`).style("fill", "#2C93E8");
        // d3.select(`.x${endx}-y${endy}`).style("fill", "#2C93E8");
        // if (Math.random() < 0.5) {
        //     return false
        // } else {
        //     return true
        // }
    
    }
    // Define the div for the tooltip
    // var div = d3.select("body").append("div")
    //     .attr("class", "tooltip")
    //     .style("opacity", 0);
  draw(selection, gridData) {
        var div = d3.select("body").append("div")
         .attr("class", "tooltip")
         .style("opacity", 0);
        var  that=this,xy0,
            path,
            keep = false,
            line = d3.svg.line()
                .x(function (d) { return d[0]; })
                .y(function (d) { return d[1]; });
    
        selection
            .on('mousedown', function () {
                keep = true;
                xy0 = d3.mouse(this);
                path = d3.select('svg')
                    .append('path')
                    .attr('d', line([xy0, xy0]))
                    .style({ 'stroke': 'blue', 'stroke-width': '2px' });
                //do the tooltip
                div.style("opacity", .9);
                div.html(function () {
                    return that.getLetters(path, gridData)
                })
                
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 60) + "px");
    
            })
            .on("touchstart", function () {
                keep = true;
                xy0 = d3.mouse(this);
                path = d3.select('svg')
                    .append('path')
                    .attr('d', line([xy0, xy0]))
                    .style({ 'stroke': 'blue', 'stroke-width': '2px' });
                //do the tooltip
                div.style("opacity", .9);
                div.html(function () {
    
                    return that.getLetters(path, gridData)
                })
                    .style("left", "0px")
                    .style("top", "0px");
            })
            .on('mouseup', function () {
                keep = false;
                div.transition()
                    .duration(200)
                    .style("opacity", 0);
                    that.checkResult(path, gridData)
            })
            .on('touchend', function () {
                keep = false;
                div.style("opacity", 0);
                that.checkResult(path, gridData)
            })
            .on('mousemove', function () {
                if (keep) {
                    let Line = line([xy0, d3.mouse(this).map(function (x) { return x - 1; })]);
                    //console.log(Line);
                    path.attr('d', Line);
                    //do the tooltip
                    div.style("opacity", .9);
                    div.html(function () {
    
                        return that.getLetters(path, gridData)
                    })
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 60) + "px");
                }
            })
            .on('touchmove', function () {
                 
                if (keep) {
                    let Line = line([xy0, d3.mouse(this).map(function (x) { return x - 1; })]);
                    //console.log(Line);
                    path.attr('d', Line);
                    //do the tooltip
                    div.style("opacity", .9);
                    div.html(function () {
    
                        return that.getLetters(path, gridData)
                    })
                        .style("left", "0px")
                        .style("top", "0px");
                }
            })
            .on('mouseleave', function () {
                if (keep === true) {
                    path.remove()
                    //keep =false;
                }
                div.transition()
                    .duration(200)
                    .style("opacity", 0);
            })
            .on('mouseenter', function () {
                keep = false
            });
    }
    
 createWordSearch() {
        let properties = this.state.properties
        let words = this.state.words
        var gridData = this.genGrid(words);
        var grid = d3.select("#grid")
            .append("svg")
            .attr("width", gridData.length * (properties.boxSize + 1) + "px")
            .attr("height", gridData.length * (properties.boxSize + 1) + "px")
            .call(this.draw, gridData);
    
        var row = grid.selectAll(".row")
            .data(gridData)
            .enter().append("g")
            .attr("class", "row");
    
        var line = { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } }
        var column = row.selectAll(".square")
            .data(function (d) { return d; })
            .enter().append("rect")
            .attr("class", function (d) { return "square" + " x" + (d.x - 1) / properties.boxSize + "-y" + (d.y - 1) / properties.boxSize; })
            .attr("x", function (d) { return d.x; })
            .attr("y", function (d) { return d.y; })
            .attr("width", function (d) { return d.width; })
            .attr("height", function (d) { return d.height; })
            .style("fill", "#fff")
            .style("stroke", "#222")
            .on("mouseover", function (d) {
                d3.select(this).style("fill", "red");
            })
    
    
        var text = row.selectAll(".text")
            .data(function (d) { return d; })
            .enter()
            .append("text")
            .attr("x", function (d, i) { return d.x + (properties.boxSize / 2); })
            .attr("y", function (d, i) { return d.y + (properties.boxSize / 2); })
            .attr("width", function (d) { return d.width; })
            .attr("height", function (d) { return d.height; })
            .text(function (d) { return d.text; })
            .attr("font-family", "sans-serif")
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "central")
            .attr("font-size", "20px")
            .attr("fill", "black")
            .on("mouseover", function (d) {
    
            })
            .on("mouseout", function (d) {
    
            });
      
    }
    componentDidMount() {
   
   
        this.createWordSearch()
        
      }



      render() {

         // const strikeoutWord = this.props.strikeoutWord;
        return (
            <div id='grid'></div>)

      }
}
export default Grid;