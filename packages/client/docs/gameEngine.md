# Игровой движок <!-- omit in toc -->
- [Структура GameEngine](#gameengine-structure)
- [Базовые классы](#basic-classes)
  - [Building](#building)
  - [Enemy](#enemy)
  - [Projectile](#projectile)
  - [Placement](#placement)
- [Создание уровня](#level-creation)
  - [Подготовка файлов](#files-preparation)
  - [Создание волн](#waves-creating)
  - [Запуск уровня](#level-starting)
- [Кастомные хуки](#hooks)
    - [usePlacementTiles](#usePlacementTiles)
    - [useMousePosition](#useMousePosition)
    - [useActiveTile](#useActiveTile)
    - [useCanvasClickBuilder](#useCanvasClickBuilder)
    - [useStartGame](#useStartGame)
  


## <a id="gameengine-structure"/> Структура GameEngine 

|       Папка       | Описание                                                                                                                                      |
|:-----------------:|:----------------------------------------------------------------------------------------------------------------------------------------------|
|    **assets**     | спрайты, используемые в игре                                                                                                                  |
|  **BaseClasses**  | базовые (абстрактные) классы, в которых реализуктся основная логика игровых элементов, например, класс Enemy                                  |
| **GameElements**  | кастомизированные классы, основанные на базовых, но имеющие уникальные характеристики, например, класс Ork, в котором настроены его параметры |
|     **hooks**     | кастомные хуки, в которые вынесена часть логики                                                                                               |
| **baseConstants** | общие базовые константы                                                                                                                       |
|     **utils**     | основная логика работы игры, а также вспомогательные функции                                                                                  |




## <a id="basic-classes"/> Базовые классы

### <a id="building"/> Building

Базовый класс, отвечающий за создание и отрисовку зданий (Башен) в игре.
Конструктор класса принимает следующие параметры, позволяя создать кастомизированный класс (`IBuildingOptions`):

|       Параметр       | Описание                                                                                                                                                     |
|:--------------------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------|
|     **position**     | координаты в Canvas элементе (на игровой карте)                                                                                                              |
|    **enemiesRef**    | массив элементов Enemy (`IEnemy`), необходим для стрельбы по целям                                                                                           |
|     **imgPath**      | ссылка на спрайт для элемента                                                                                                                                |
|      **frames**      | количество кадров в спрайте (для реализации анимации)                                                                                                        |
|      **offset**      | смещение элементы, необходим для более точноко расположения здания на поле                                                                                   |
|      **Bullet**      | класс, который содержит реализацию логики для снарядов, которыми стреляет башня                                                                              |
|   **bulletParams**   | характеристики снарядов (скорость, урон)                                                                                                                     |
|   **bulletOffset**   | смещение точки старта снарядов, для корректировки места из которого стреляет башня                                                                           |
|   **fireOnFrame**    | кадр анимации, на котором должен происходить выстрел                                                                                                         |
| **renderEachXFrame** | скорость анимации, чтобы регулировать скорость нужно передать число, например, 1 - рендер на каждый кадр, а 5 - рендер на каждый 5 кадр (анимация медленнее) |


#### Методы класса
1. draw - отрисовка здания и его анимацию
2. shoot - вызов метода создаёт снаряд, который летит к конкретному элементу Enemy
3. update - вызывает метода draw, а также метод shoot на нужном кадре анимации.


### <a id="enemy"/> Enemy

Базовый класс, отвечающий за создание и отрисовку врагов в игре.
Конструктор класса принимает следующие параметры, позволяя создать кастомизированный класс (`IEnemyOptions`):

|   Параметр    | Описание                                                                |
|:-------------:|:------------------------------------------------------------------------|
| **waypoints** | массив с координатами точек, через которые должен быть построен маршрут |
|    **gap**    | расстояние между врагами                                                |
|  **health**   | количество "здоровья" у врага                                           |
|   **speed**   | скорость перемещения                                                    |
|  **imgPath**  | ссылка на спрайт для элемента                                           |
|  **frames**   | количество кадров в спрайте (для реализации анимации)                   |

#### Методы класса
1. draw - отрисовку здания, его анимацию
2. update - вызов метода draw, а также тут реализована логика, отвечающие за движение по точкам маршрута.
   

### <a id="projectile"/> Projectile

Базовый класс, отвечающий за создание и отрисовку снарядов в игре.
Конструктор класса принимает следующие параметры, позволяя создать кастомизированный класс (`IProjectileOptions`):

|  Параметр    | Описание                                                                                         |
|:------------:|:-------------------------------------------------------------------------------------------------|
| **position** | стартовая позиция на карте, в которой будет создаваться снаряд (от куда осуществляется стрельба) |
|  **enemy**   | враг, который является целью конкретного снаряда                                                 |
|  **speed**   | скорость снаряда                                                                                 |
|  **power**   | сила снаряда (сколько "жизней" у врага отнимает в момент попадания)                              |
| **imgPath**  | ссылка на спрайт для элемента                                                                    |

#### Методы класса
1. draw - отрисовку здания, его анимацию
2. update - вызов метода draw, а также расчёт меняющихся координат, чтобы добраться до врага.


### <a id="placement"/> Placement

Базовый класс, отвечающий за создание разметки зон, в которых возможно строительство, 
а также обработку события hover.
Конструктор класса принимает следующие параметры, позволяя создать кастомизированный класс (`IPlacementOptions`):

|  Параметр    | Описание                                                                             |
|:------------:|:-------------------------------------------------------------------------------------|
| **position** | координаты верхнего левого угла (начало координат), точки из которой строится плитка |

#### Методы класса
1. draw - отрисовка плитки
2. update - вызов метода draw, а также обработка события hover.


## <a id="level-creation"/> Создание уровня

### <a id="files-preparation"/> Подготовка файлов
Для добавления нового уровня в игру необходимо создать для него папку по адресу `packages/client/src/components/Levels`

В данной папке необходимо создать:
 - папку img и положить туда картинку с картой;
 - файл `constants.ts`, который должен содержать 2 переменные:
   - `level1WayPoints` - массив координат (`IPosition`), содержащий все точки маршрута, 
   которые должны пройти враги (они будут идти по прямой от одной точки к другой)
   - `level1Placements` - разметка зон, в которых разрешено строительство (массив чисел)
   - `enemyWavesLevel1` - массив объектов (`ICreateEnemyOptions`), в которых описываются характеристики волны
 - основной файл уровня (`LevenName.tsx`)

### <a id="waves-creating"/> Создание волн
Для создания волны нужно заполнить следующие характеристики:

|    Параметр     | Описание                                                                                                       |
|:---------------:|:---------------------------------------------------------------------------------------------------------------|
|  **quantity**   | количество врагов в волне                                                                                      |
| **levelPoints** | путь по которому должны идти враги (в карте могут быть развилки и разные волны могут идти по разным маршрутам) |
|     **gap**     | расстояние между врагами                                                                                       |
|   **speed**     | скорость с которой перемещаются враги                                                                          |
| **EnemyModel**  | класс из которого будут создаваться враги (вид врагов в волне)                                                 |

Можно добавлять в массив несколько подобных объектов, меняя характеристики, в результате 
получим несколько волн на уровне с разными параметрами.

### <a id="level-starting"/> Запуск уровня
В начале уровня необходимо:
- определить количество жизней с помощью useRef, а также в store.
- (для первого уровня) вызвать метод `newGame` и передать в него количество жизней и монет для данного уровня.
- с помощью хука useStartGame начать игру
```javascript
  const { canvasRef, activeTileRef, buildingsRef, enemiesRef } 
  = useStartGame({
    hearts: hearts,
    gameParams: {
      enemyWaves: enemyWavesLevel1,
      levelPlacements: level1Placements,
      map,
    },
  })
```
- также создать функцию обработчик кликов по холсту с помощью хука useCanvasClickBuilder.
Важно обратить внимание, что именно тут задаётся тип башни, который будет строиться на данном 
уровне при клике на соответствующую ячейку.
(Типы врагов определяются при создании волн врагов).
```javascript
const canvasClickHandler = useCanvasClickBuilder(
    activeTileRef,
    buildingsRef,
    OrkTower
  )
```
- компонент уровня должен вернуть canvas-элемент, в который нужно передать `ref` из `useStartGame`, а так `onClick` из `useCanvasClickBuilder`
```javascript
return <canvas onClick={canvasClickHandler} ref={canvasRef} />
```

## <a id="hooks"/> Кастомные хуки

### <a id="usePlacementTiles"/> usePlacementTiles
Хук получает на вход массив из чисел (0 и 14), где 14 говорит, что на данном месте строить можно, а 0 - нельзя.

Преобразует входящий массив чисел в массив элементов-Placement (только для тех мест, где можно строить)


### <a id="useMousePosition"/> useMousePosition
Хук получает на вход canvasRef.

Внутри хука реализована функция, отслеживающая событие `mousemove` и обновляющая данные положении курсора на холсте.

Возвращает координаты мышки на холсте.


### <a id="useActiveTile"/> useActiveTile
Хук получает на вход mouseRef, который содержит информацию о координатах мышки, а также массив элементов-Placement, созданных с помощью хука usePlacementTiles.

Возвращает данные активной ячейки.

### <a id="useCanvasClickBuilder"/> useCanvasClickBuilder
Хук принимает на вход `activeTile` (активную плитку), `buildingsRef` (массив зданий), `Tower`(класс здания, которое нужно построить).
Хук создаёт функцию-обработчик со следующей логикой:
 - получает информацию о количестве монет;
 - по событию "клик":
   - в активной ячейке проверяет свободно ли;
   - проверяет - хватит ли монет для строительства здания;
   - (если свободно и хватает монет) добавляет здание, отмечает ячейку как занятую, вычитает стоимость башни из общего количества монет;
Возвращает хук функцию-обработчик.

### <a id="useStartGame"/> useStartGame
Вызов данного хука запускает игру.
При вызове хука нужно передать следующие параметры:
- hearts - количество жизней при старте уровня
- gameParams:
  - map - урл на карту уровня 
  - enemyWaves - массив волн (параметр опциональный, при его отсутствии волны сгенерируются автоматически)
  - levelWayPoints - массив координат, по которым должны идти враги
  - levelPlacements - массив мест, в которых допустимо строительство 

### <a id="useStartGame"/> useAnimateCanvas
Функция, которая отвечает за отрисовку каждого кадра.
При вызове нужно передать следующие параметры:
- context - контекст Canvas
- background - картинку для фона
- placementTiles - массив с плитками, на которых возможно строительство
- buildingsRef - массив с существующими зданиями
- enemiesRef массив с существующими врагами
- mouseRef - позиция мыши
- waves - массив с волнами
- hearts - количество жизней
- setHearts - функция для изменения количества жизней
- onEnemyDefeated - функция, для обработки победы над врагом

