# Trumpet

<ClientOnly>
<pic :link="`https://funpic-api.herokuapp.com/api/trumpet?urlfirst=${$var.avatarExample}&urlsecond=${$var.avatarExample2}`" />
</ClientOnly>

- **URL**  
  `{{$var.api}}/trumpet`
- **URL Params**  
  `urlfirst` - ссылка на первое изображение  
  `urlsecond` - ссылка на второе изображение

<app-link :href="`https://funpic-api.herokuapp.com/api/trumpet?urlfirst=${$var.avatarExample}&urlsecond=${$var.avatarExample2}`" text="Пример" />
