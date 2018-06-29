export default (config) => {
    return new Promise( (resolve, reject) =>  {
        if (config.url === 'https://api.github.com/repos/two/one/issues') {
            resolve({
                data: [
                    {
                        id: 1
                    },
                    {
                        id: 2
                    }
                ]
            })
        }
        resolve({});
    })
}

