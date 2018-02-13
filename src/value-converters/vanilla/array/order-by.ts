

export class OrderByValueConverter {

  public toView(array: Array<any>, property: string, direction = 'desc') {

    let _array = array.slice(0); //  creates a shallow copy of an array
    //  value converters should absolutely not modify their source value.
    //  It is not the expected behavior, so such a converter would be surprising,
    //  in a really bad way, to developers using it

    const directionFactor = direction === 'desc' ? -1 : 1;

    _array.sort((current, next) => {
      const currentValue = current[property];
      const nextValue = next[property];

      if (currentValue > nextValue) {
        return directionFactor;
      } else if (currentValue < nextValue) {
        return -directionFactor;
      }

      return 0;
    });

    return _array;
  }
}
