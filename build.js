const fs = require('fs');
const path = require('path');
const camelcase = require('camelcase');
const snakeCase = require('snake-case').snakeCase;
const buildDirectory = 'build';

let files = fs.readdirSync(buildDirectory);
for (const file of files) {
    fs.unlinkSync(path.join(buildDirectory, file));;
}

const jsonFile = fs.readFileSync('./table_data.json', 'utf8');
const jsonData = JSON.parse(jsonFile);

const insertColumnsAndData = (columns, key) => {
    var result = '';
    for(var i=0; i<columns.length; i++) {
        if(key == columns[i]) { continue; }
        if(columns[i] == 'REG_DATE' || columns[i] == 'UPDATE_DATE') { result += columns[i]+' = '+'NOW()' }
        else {
            result += columns[i]+' = '+`#{${camelcase(columns[i].toLowerCase())}}`
        }
        if( (i+1) != columns.length ) { result += ', \n\t\t\t' }
    }
    return result;
}
const createXmlRepoContent = (package, naming, tableName, columns, key) => {
    // naming 으로 VO_NAME UPPER_NAMING LOWER_NAMING 만들기
    var targetPackage = package,
        repoName = naming+"Repo", 
        voName = naming+"Vo",
        upperNaming = snakeCase(naming).toUpperCase(),
        lowerNaming = snakeCase(naming).toLowerCase(),
        columnNames = columns.map((obj) => obj.name),
        commaColumns = columnNames.join(', \n\t\t\t');
    var content = fs.readFileSync('./target/MyBatisRepo.xml', 'utf8');
    content = content.replace(/\${TARGET_PACKAGE}/g, targetPackage);
    content = content.replace(/\${REPO_NAME}/gi, repoName);
    content = content.replace(/\${VO_NAME}/gi, voName);
    content = content.replace(/\${TABLE_NAME}/g, tableName);
    content = content.replace(/\${UPPER_NAMING}/gi, upperNaming);
    content = content.replace(/\${LOWER_NAMING}/gi, lowerNaming);
    content = content.replace(/\${COMMA_COLUMNS}/gi, commaColumns);
    content = content.replace(/\${PRINT_COLUMNS_AND_DATA}/gi, insertColumnsAndData(columnNames, key));
    content = content.replace(/\${KEY_WHERE}/gi, `${key} = #{${camelcase(key.toLowerCase())}}`);
    // ${TARGET_PACKAGE} ${VO_NAME} ${UPPER_NAMING} ${LOWER_NAMING} ${COMMA_COLUMNS}

    return content;
}
const createJavaRepoContent = (package, naming, key) => {

    var content = fs.readFileSync('./target/Repo.java', 'utf8');
    content.replace(/\${TARGET_PACKAGE}/g, package);
    content = content.replace(/\${NAMING}/g, naming);
    naming = naming[0].toLowerCase() + naming.slice(1,naming.length);
    content = content.replace(/\${NAMING_FIRST_LOWER}/g, naming);
    content = content.replace(/\${KEY_WHERE}/gi, `@Param("${camelcase(key.toLowerCase())}") Long ${camelcase(key.toLowerCase())}`);
    
    return content;
}
const createServiceContent = (package, naming, key) => {
    var content = fs.readFileSync('./target/Service.java', 'utf8');
    content.replace(/\${TARGET_PACKAGE}/g, package);
    content = content.replace(/\${NAMING}/g, naming);
    naming = naming[0].toLowerCase() + naming.slice(1,naming.length);
    content = content.replace(/\${NAMING_FIRST_LOWER}/g, naming);
    content = content.replace(/\${KEY_LOWER}/gi, `${camelcase(key.toLowerCase())}`);
    return content;
}
const createVoContent = (package, naming, columns) => {

    var content = fs.readFileSync('./target/Vo.java', 'utf8');
    content.replace(/\${TARGET_PACKAGE}/g, package);
    content = content.replace(/\${NAMING}/g, naming);
    var privateVoStr = columns.map((obj) => {
        return `private ${obj.type} ${camelcase(obj.name)}`;
    }).join(';\n')+';';
    content = content.replace(/\${PRINT_COLUMNS_TYPE_AND_NAME}/g, privateVoStr);
    return content
}

const createFiles = {
    xmlRepo : {
        name : jsonData.naming+'Repo.xml',
        content : createXmlRepoContent(
            jsonData.targetPackage, 
            jsonData.naming,
            jsonData.tableName,
            jsonData.columns,
            jsonData.key
        )
    },
    javaRepo : {
        name : jsonData.naming+'Repo.java',
        content : createJavaRepoContent(
            jsonData.targetPackage,
            jsonData.naming,
            jsonData.key
        )
    }
    ,
    service : {
        name : jsonData.naming+'Service.java',
        content : createServiceContent(
            jsonData.targetPackage,
            jsonData.naming,
            jsonData.key
        )
    },
    vo : {
        name : jsonData.naming+'Vo.java',
        content : createVoContent(
            jsonData.targetPackage,
            jsonData.naming,
            jsonData.columns
        )
    }
}


for(var key in createFiles) {
    var file = createFiles[key];
    fs.writeFileSync('./build/'+file.name, file.content);
} 
