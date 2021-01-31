const mongoose = require('mongoose');
const mongoose_host = 'mongodb://127.0.0.1:27017/';

mongoose.connect(mongoose_host+'jwt',{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology:true,
}).then((res)=>{
    console.log('run your mongoose server');
}).catch((error)=>{
    console.log(error);
})