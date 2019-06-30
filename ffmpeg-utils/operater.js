const util = require('util');
const exec_process = util.promisify(require('child_process').exec);

async function exec_command(cmd) {
  const { stdout, stderr } = await exec_process(cmd);
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
}

var fs = require('fs')
var path = require('path')

function convert(){
    audio_dir = '/Users/lidengke/Desktop/myfiles/英语'
    fs.readdir(audio_dir, function(err, files){
        if(err){
            console.error(err)
        }
        files.forEach(function(file, index){
            if(!file.endsWith('.aiff')){
                return
            }
            let s = path.join(audio_dir,file)
            let number = file.split(' ')[0]
            let des = path.join(audio_dir, `${number}.mp3`)
            console.log(s)
            console.log(des)
            var cmd = `ffmpeg -i '${s}' ${des}`
            exec_command(cmd)
        })
    })
}

function concat(source_files, dest){
    let sources = source_files.join('|')
    var cmd = `ffmpeg -i "concat:${sources}" -c copy ${dest}`
    exec_command(cmd)
}

let audio_dir = '/Users/lidengke/Desktop/myfiles/英语/'
var source_files = `${audio_dir}23.mp3|${audio_dir}24.mp3`.split('|')
concat(source_files,`${audio_dir}lesson.mp3`)