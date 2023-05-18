fetch(
  "https://api.openweathermap.org/data/2.5/forecast?q=denver&appid=27061162a30b917fc81c94771b80abfd"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
