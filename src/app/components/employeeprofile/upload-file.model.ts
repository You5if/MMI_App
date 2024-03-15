
export class FileListModel {
    constructor(
        public originalFileName: string,
        public fileName: string,
        public extension: string,
        public fullPath: string,
        public apiPath: string,
        public apiImagePath: string
    ) { }
}
