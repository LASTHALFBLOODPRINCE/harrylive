import fetch from 'node-fetch';

export async function handler(event, context) {
  const city = event.queryStringParameters.city;
  const API_KEY = process.env.WEATHER_API_KEY;

  if (!city) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'City is required' }),
    };
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Something went wrong' }),
    };
  }
}
