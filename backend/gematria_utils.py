def hebrew_gematria(word):
    gematria_map = {'א': 1, 'ב': 2, 'ג': 3, 'ד': 4, 'ה': 5, 'ו': 6, 'ז': 7, 'ח': 8, 'ט': 9, 'י': 10,
                    'כ': 20, 'ל': 30, 'מ': 40, 'נ': 50, 'ס': 60, 'ע': 70, 'פ': 80, 'צ': 90, 'ק': 100,
                    'ר': 200, 'ש': 300, 'ת': 400, 'ך': 20, 'ם': 40, 'ן': 50, 'ף': 80, 'ץ': 90}
    return sum(gematria_map.get(letter, 0) for letter in word)

# Genesis 1:1 example
verse = 'בראשית ברא אלהים את השמים ואת הארץ'
total = sum(hebrew_gematria(word) for word in verse.split())
print(total)  # 2701
