import {interceptors2} from './serve'
import sort from './sort'
import someSortData from './someSortData'
import gameUrl from './gameUrl'

// 分类
function getExternalTypeList (data = {}) {
    return new Promise ( (resolve,reject) => {
        interceptors2.get(sort.sort)
        .then( (res) => {
            resolve(res)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}

// 某个分类的数据  
function getExternalListData (data = {}) {
    return new Promise ( (resolve,reject) => {
        interceptors2.get(someSortData.someSortData,{
            params : data
        })
        .then( (res) => {
            resolve(res)
        })
        .catch((err)=>{
            reject(err)
        })
    })
} 

// 单个数据    
function getExternalSingle (data = {}) {
    return new Promise ( (resolve,reject) => { 
        interceptors2.get(gameUrl.gameUrl,{
            params : data
        })
        .then( (res) => {
            resolve(res)
        })
        .catch((err)=>{
            reject(err)
        })
    })
} 
export {
    getExternalTypeList,
    getExternalListData,
    getExternalSingle
}