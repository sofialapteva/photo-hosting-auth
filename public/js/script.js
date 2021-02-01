window.addEventListener('DOMContentLoaded', function () {
  const apikey = 'AEU1BtQQVQBOOVeFKP4XZz';
  const client = filestack.init(apikey);

  const onProgress = (evt) => {
    document.getElementById('progress').innerHTML = `${evt.totalPercent}%`;
  };

  document.querySelector('#content').addEventListener('change', (event) => {
    const file = event.target.files[0];
    console.log(file)
    const token = {};

    document.forms.uploadForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const comment = document.forms.uploadForm.comment.value;
      client.upload(file, { onProgress }, {}, token)
        .then(async (res) => {
          console.log('success: ', res)
          await fetch('/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              url: res.url,
              comment: comment
            })
          });
          location.href = '/'
        })
        .catch(err => {
          console.log(err)
        });
    })
  });
});
