const fs = require('fs')
const path = require('path')
const parse = require('csv-parse')
const dataFile = path.join(__dirname,'resources',process.argv[2])

var parser = parse((error,data) => {
    if(error){
        console.error('Encountered Parsing Error:',error.message)
    }
    else{
        let totalData = []
        let i = 0
        var titles = []
        for(let k=0;k<data.length;k++){
            line = data[k]
            if(k == 0){
                titles = line
                continue
            }
            let index = 0;
            var individualDetails = {}
            while(index < line.length){
                var property = titles[index]
                individualDetails[property] = line[index++]
            }
            totalData[i++] = individualDetails
            individualDetails = JSON.stringify(individualDetails)
        }
        totalData = JSON.stringify(totalData,null,"\t")
        createJSONFile(totalData)
    }
})

createJSONFile = (data) =>{
    fs.writeFile(path.join(path.parse(dataFile).dir,path.parse(dataFile).name+'.json'),data,'utf-8', (error) => {
        if(error){
            console.log('Encountered Error while creating a JSON File:',error.message)
        }
    })
}

fs.createReadStream(dataFile).pipe(parser)