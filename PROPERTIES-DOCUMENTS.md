# Collection accounts

- _id           ObjectId
- username      String
- group         String
- boxId         String
- fio           String
- status        String
- description   String
- createDate    String
- updateDate    String
- hash          String
- salt          String
- createOwner   ObjectId
- updateOwner   ObjectId

# Collection resources

- _id               ObjectId
- id                String
- title             String
- description       String
- eventColor        String
- createDate        String
- updateDate        String
- createOwner       ObjectId - link to collection account _id
- updateOwner       ObjectId - link to collection account _id
- children          Array
    - id            String
    - title         String
    - description   String
    - createDate    String
    - updateDate    String
    - createDate    String
    - updateDate    String
    - createOwner       ObjectId - link to collection account _id
    - updateOwner       ObjectId - link to collection account _id

# Collection customer

- _id                   ObjectId
- name                  String
- phone                 String
- vin                   String
- DriverLicenseNumber   String
- Mileage               String
- createOwner           ObjectId - link to collection account _id
- updateOwner           ObjectId - link to collection account _id
- createDate            String
- updateDate            String


# Collection status

- _id         ObjectId
- title       String
- description String
- createDate  String
- updateDate  String
- createOwner           ObjectId - link to collection account _id
- updateOwner           ObjectId - link to collection account _id

# Collection typeOfWork

- _id         ObjectId
- title       String
- boxId       ObjectId - link to collection resources _id
- createDate  String
- updateDate  String
- createOwner           ObjectId - link to collection account _id
- updateOwner           ObjectId - link to collection account _id


# Collection event

- _id         ObjectId
- id          String
- resourceId  String
- start       String
- end         String
- title       String
- customer    ObjectId - link to collection customer _id
- createOwner ObjectId - link to current logged user
- updateOwner ObjectId - link to collection account _id
- createDate  String
- updateDate  String

# Свойства добавляются по умолчанию
# Свойства для создания

- createOwner ObjectId
- createDate String

# Свойства для изменения

- updateOwner ObjectId
- updateDate  String


