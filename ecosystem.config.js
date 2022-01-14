module.exports = {
    apps: [
        {
            name: "udemy restapi", // pm2로 실행한 프로세스 목록에서 이 애플리케이션의 이름으로 지정될 문자열
            script: "./index.js", // pm2로 실행될 파일 경로
            instances : 1,
            autorestart : true,
            watch: true, // 파일이 변경되면 자동으로 재실행 (true || false)
            max_memory_restart: '450M',
            env: {
                "NODE_ENV": "development" 
            },
        }
    ]
};