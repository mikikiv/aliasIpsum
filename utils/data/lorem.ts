export interface Composition {
  textElement: string
  count: number
  type?: string
}

export const PlaceText = ({ textElement, count, type }: Composition) => {
  let p
  switch (textElement) {
    case 'sentences':
      switch (type) {
        case lorem:
          p = lorem.split('. ')
          return p.slice(0, count).join('. ')
          break

        default:
          p = lorem.split('. ')
          return p.slice(0, count).join('. ')
          break
      }

      break
    case 'paragraphs':
      switch (type) {
        case lorem:
          p = lorem.split('\n\n')
          return p.slice(0, count).join('\n\n')
          break

        default:
          p = lorem.split('\n\n')
          return p.slice(0, count).join('\n\n')
          break
      }
    case 'words':
      switch (type) {
        case lorem:
          p = lorem.split(' ')
          return p.slice(0, count).join(' ')
          break

        default:
          p = lorem.split(' ')
          return p.slice(0, count).join(' ')
          break
      }
    case 'array':
      switch (type) {
        case 'lorem':
          p = lorem.split(' ').slice(0, count)
          p = JSON.stringify(p)
          return p
          break
        default:
          p = lorem.split(' ').slice(0, count)
          p = JSON.stringify(p)
          return p
          break
      }
    default:
      return "I don't know what you want me to do"
      break
  }
}

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget risus quis eros vestibulum suscipit. Integer lacinia libero ac velit commodo, sed dictum sapien congue. Nullam ut est massa. Nullam ac quam ut mauris sagittis scelerisque.

Donec sed nulla ut lacus ultricies fringilla. Aliquam sit amet enim vitae elit congue bibendum id quis augue. Ut sed posuere ante. In hac habitasse platea dictumst. Nullam posuere dolor sit amet ex consequat pulvinar.

Sed auctor enim eu nisi iaculis, non eleifend est suscipit. Proin non magna sit amet mi posuere pellentesque vel nec ante. Etiam fringilla, elit eget elementum sodales, nisi erat vulputate lorem, id scelerisque dolor sapien nec nulla. Morbi ac congue odio. Fusce id est vitae ipsum bibendum ultrices.

Mauris eu lectus vel mi faucibus dapibus sed quis metus. Duis quis mauris massa. Curabitur dapibus ac nulla eget malesuada. In eget dolor a odio ullamcorper molestie vel eu augue. Etiam ultrices, felis in porttitor bibendum, ipsum risus laoreet metus, vitae facilisis justo nisl sed nibh.

Sed eu mi vel arcu eleifend imperdiet. Nulla facilisi. Nam eu neque eget nisi posuere ullamcorper. Vestibulum semper felis quis ipsum scelerisque fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;

Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla facilisi. Proin id lectus libero. Donec sed lacinia odio. In eget purus non magna malesuada bibendum.

Etiam luctus elit vel elit aliquam efficitur. Suspendisse malesuada nunc non lorem pretium, non euismod orci volutpat. Praesent fermentum, est quis euismod faucibus, mi nisl tincidunt ante, in bibendum quam ex id dolor. Sed sit amet magna euismod, pellentesque lorem ac, finibus ipsum.

Cras sodales enim eu diam malesuada, vitae scelerisque nibh molestie. Maecenas consequat sapien eu lectus vestibulum, at fermentum dolor fringilla. Suspendisse potenti. Ut quis massa sed nisl tempor lobortis ac eu augue. Integer pharetra sem vel felis tempor, eget malesuada ex rutrum.

Vivamus ac ligula nec lorem luctus mollis. Pellentesque hendrerit massa vel metus malesuada, eu sagittis elit maximus. Praesent eget libero vel magna ultrices rhoncus. Nullam bibendum erat id nunc congue, sit amet posuere purus laoreet. Duis euismod bibendum ipsum ac iaculis.

Aliquam suscipit turpis eget purus molestie, eu lobortis orci molestie. In hac habitasse platea dictumst. Nulla fermentum odio vel augue iaculis bibendum. Sed tincidunt, eros eget semper convallis, lorem ante facilisis tortor, id ultricies nisl nunc eget nunc. Nulla facilisi.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget velit vitae augue facilisis interdum. Duis tristique nulla et purus convallis, vel suscipit mi accumsan. Phasellus ut diam eget mi ultricies cursus. Praesent commodo commodo mi in volutpat.

Fusce auctor justo eget ex sollicitudin, vel hendrerit felis bibendum. Sed at elit in risus faucibus varius. Nam a ex eu augue commodo iaculis sed euismod nulla. Ut nec aliquet augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;

Proin eget felis ac libero bibendum semper ac quis dui. Ut nec semper sapien. Vestibulum euismod dapibus dui, ac aliquam metus mollis quis. In nec euismod augue. Integer non ipsum non augue auctor egestas at sit amet arcu.

Suspendisse volutpat euismod eros, vel venenatis augue faucibus eu. Pellentesque at massa vel dolor bibendum bibendum. Fusce in elit id nulla eleifend congue. Morbi aliquam risus sit amet erat placerat, id sagittis nisi mattis. Aliquam vel mi diam.

Donec vestibulum justo vel massa finibus, nec tristique velit blandit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Ut at augue ac purus viverra lobortis nec vel metus. Praesent aliquam massa non velit consequat, ut vehicula felis tincidunt.

Maecenas pulvinar enim nec aliquam dignissim. Duis faucibus risus nec libero mollis, non vestibulum nisl commodo. Morbi quis tellus ac tellus tincidunt consequat. Donec ultrices hendrerit ante, id ultrices massa bibendum a. Aenean commodo nulla eget odio venenatis, ac volutpat sapien sollicitudin.

Nulla facilisi. Integer a metus vitae massa interdum maximus. Sed eget odio eget sem blandit pretium quis at libero. Aliquam erat volutpat. Curabitur non lectus non odio pulvinar convallis.

Quisque rutrum mauris at nibh scelerisque, quis fringilla elit lobortis. Sed lacinia enim ut mauris vehicula lobortis. Donec ut felis nec justo rhoncus lobortis. Fusce id dui eget odio vulputate bibendum. Etiam euismod magna non quam convallis malesuada.

Morbi vel tellus dignissim, convallis sapien sit amet, sollicitudin ipsum. Maecenas ut sem eget nulla hendrerit gravida a a ipsum. Nulla convallis nunc vel neque bibendum malesuada. Integer et sem quis lectus consectetur porttitor. Fusce suscipit, turpis a venenatis vehicula, quam est efficitur sapien, in bibendum enim ipsum sit amet justo.

Sed imperdiet, velit eget mollis bibendum, libero ipsum bibendum nulla, eu blandit odio tortor nec justo. Vivamus rhoncus nibh vel tortor viverra consectetur. Ut ac aliquam ipsum. Maecenas vitae odio vel elit sollicitudin matt.`
