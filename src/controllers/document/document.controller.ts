import catchAsync from "../../middleware/catch-async";
import { Request, Response } from "express";
import { documentService } from "../../services/ducument.service";
import { DocumentUser } from "../../db/models/documnet-user.model";
import { Document } from "../../db/models/document.model";
import { validationResult } from "express-validator";

class DocumentController{
    public getOne = catchAsync(async (req: Request, res: Response) => {
        if(!req.user) return res.sendStatus(401);
        const { id } = req.params;

        const document = await documentService.findDocumentById(
            parseInt(id),
            parseInt(req.user.id)
        );
    })

    public getAll = catchAsync(async (req: Request, res:Response) => {
        let documents = await Document.findAll({
            where:{
                userId: req.user?.id
            },
        });

        const documentUsers = await DocumentUser.findAll({
            where: {
                userId: req.user?.id
            },
            include: {
                model: Document,
            },
        });

        const sharedDocument = documentUsers.map(
            (documentUser) => documentUser.documnet
        );

        documents.push(...sharedDocument);

        return res.status(200).json(documents)
    })

    public update = catchAsync(async (req: Request, res: Response)=>{
        const err = validationResult(req);
        if(!err.isEmpty()) {
            return res.status(400).send(err);
        }

        if(!req.user) return res.sendStatus(401);

        const {id} = req.params;
        const{title, content, isPublic} = req.body;

        const document = await documentService.findDocumentById(
            parseInt(id),
            parseInt(req.user.id)
        );

        if(document === null) return res.sendStatus(404);

        if(title !== undefined && title !== null) document.title = title;
        if(content !== undefined && content !== null) document.content = content;
        if(isPublic !== undefined &&  isPublic !== null) document.isPublic = isPublic;

        await document.save();
        return res.sendStatus(200);
    })

    public create = catchAsync(async (req: Request, res: Response) =>{
        const document = await Document.create({
            userId: req.user?.id,
        });
        
        return res.status(200).json(document);
    })

    public delete = catchAsync(async (req: Request, res: Response)=>{
        const {id} = req.params;

        await Document.destroy({
            where:{
                id: id,
                userId: req.user?.id
            }
        })

        return res.sendStatus(200);
    })
}

const documentController = new DocumentController();

export {documentController};