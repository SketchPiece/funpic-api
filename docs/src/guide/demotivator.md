# Demotivator

<ClientOnly>

<pic :link="`https://funpic-api.herokuapp.com/api/demotivator?url=${$var.avatarExample}&args=${JSON.stringify(['Смотрит','Зачем он это делает?', 'раздевает взглядом'])}`" />
</ClientOnly>

- **URL**  
  `{{$var.api}}/demotivator`
- **URL Params**  
  `url` - ссылка на изображение  
  `args` - массив аргументов текста в формате JSON  
  Например: `["Смотрит","Зачем он это делает?", "раздевает взглядом"]`

<app-link :href="`https://funpic-api.herokuapp.com/api/demotivator?url=${$var.avatarExample}&args=${JSON.stringify(['Смотрит','Зачем он это делает?', 'раздевает взглядом'])}`" text="Пример" />
