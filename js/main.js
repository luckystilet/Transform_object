const people =
    [
        {
            fullName : {
                surname : 'Polakov',
                firstName : 'Alex',
                middleName: 'Valerievich'
            },
            birthday : '02-19-1989',
            job: 'Front-end',
            kids: 0,
            happy: true
        },
        {
            fullName : {
                surname : 'Kudrya',
                firstName : 'Vladislav',
                middleName: 'Vitalievich'
            },
            birthday : '02 21 1988',
            job: '3D',
            kids: 1,
            happy: false
        }
    ]

const filterObj = {
    fullName : {
        surname : true,
        firstName : true,
        middleName: false
    },
    birthday : true,
    job: true,
    kids: false,
    happy: true
}

const localeObj = {
    fullName : {
        surname : 'Прізвище',
        firstName : "Ім'я",
        middleName: 'Побатькові'
    },
    birthday : 'День народження',
    happy: "Щасливий"
}
const resArr = []
for(const [idx, personObj] of people.entries()){
    // Рекурсивно проходимся по всем объектам одновременно
    function myRecursFunc(personObjCurrentDeepth, filterObjCurrentDeepth, localeObjCurrentDeepth){
        for(const current in personObjCurrentDeepth){
            const resLine = {}
            // Если Object то вызываем рекурсивно функцию
            if(typeof(personObjCurrentDeepth[current]) === 'object'){
                myRecursFunc(personObjCurrentDeepth[current], filterObjCurrentDeepth[current], localeObjCurrentDeepth[current])
                continue
            }
            // В resLine["name"] ложим, или локализованое значение того же уровня вложености
            // или, если такого имени свойства нет, - текущее имя свойства.
            if(localeObjCurrentDeepth.hasOwnProperty(current)){
                resLine["name"] = localeObjCurrentDeepth[current]
            }else{
                resLine["name"] = current
            }
            // Значение
            let value = personObjCurrentDeepth[current]
            // Проверка на Date
            if(typeof(value) === 'string' && new Date(value).getMonth() > -1){
                let newDate = new Date(value)
                let day = newDate.getDate()
                day = day < 10 ? '0' + day : day
                let month = newDate.getMonth()+1
                month = month < 10 ? '0' + month : month
                let year = newDate.getFullYear()
                value = `${day}.${month}.${year}`
            }
            // Проверка на Boolean
            if(typeof(value) === 'boolean'){
                value = value ? 'ТАК' : 'НІ'
            }
            // Проверка результирующего массива объектов на наличие такой категории
            // Если категория есть - добавляем в нее же, если нет - создаем ее.
            const filterRes = resArr.filter(field=>field.name === resLine.name)
            if(filterRes.length){
                for(let i = 0; i < resArr.length; i++){
                    if(resArr[i].name === resLine.name){
                        resArr[i][`${current}_${idx+1}`] = value
                    }
                }
            }else{
                resLine[`${current}_${idx+1}`] = value
                resArr.push(resLine)
            }
        }
    }
    myRecursFunc(personObj, filterObj, localeObj)
}
// Результат
console.log("resArr",resArr);
