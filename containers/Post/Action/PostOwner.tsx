import {
    Button,
    IconButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
} from '@mui/material';
import BasicMenu from '@/components/menu/BasicMenu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import { useI18n } from '@/locales/client';
import BootstrapDialog from '@/components/dialog/BootstrapDialog';
import useAPI from '@/hooks/useAPI';
import { ObjectLiteral } from '@/types/object-literal.interface';
import API from '@/configs/api';
import { showError } from '@/utils';
import { toast } from 'react-toastify';

type Props = {
    isArchived?: boolean;
    postId: string;
};

export default function PostOwner({
    isArchived: isArchivedInput,
    postId,
}: Props) {
    const t = useI18n();
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [isArchived, setIsArchived] = useState(false);

    const apiDeletePost = useAPI<ObjectLiteral, string>(API.postDelete, {
        onSuccess: () => {
            toast.success(t('message.success.success'), { theme: 'colored' });
            setOpenDeleteDialog(false);
            setTimeout(() => {
                window.location.reload();
            }, 3500);
        },
        onError: (err) => {
            showError(err);
        },
    });
    const apiArchivePost = useAPI<
        ObjectLiteral,
        { post_id: string; archive: boolean }
    >(API.postArchive, {
        onSuccess: (_raw, res) => {
            setIsArchived(res.params?.archive || false);
            toast.success(t('message.success.success'), { theme: 'colored' });
        },
        onError: (err) => {
            showError(err);
        },
    });

    useEffect(() => {
        if (isArchivedInput === undefined) return;
        setIsArchived(isArchivedInput);
    }, [isArchivedInput]);

    function onClickDelete() {
        apiDeletePost.call(postId);
    }
    function onClickArchive() {
        apiArchivePost.call({ post_id: postId, archive: true });
    }
    function onClickUnarchive() {
        apiArchivePost.call({ post_id: postId, archive: false });
    }
    return (
        <>
            <BasicMenu
                menuID='more'
                menuButton={
                    <IconButton size='medium' color='inherit'>
                        <MoreVertIcon />
                    </IconButton>
                }
            >
                {isArchived ? (
                    <MenuItem onClick={onClickUnarchive}>
                        <ListItemIcon>
                            <UnarchiveIcon fontSize='small' />
                        </ListItemIcon>

                        <ListItemText>{t('post.unarchive_post')}</ListItemText>
                    </MenuItem>
                ) : (
                    <MenuItem onClick={onClickArchive}>
                        <ListItemIcon>
                            <ArchiveIcon fontSize='small' />
                        </ListItemIcon>

                        <ListItemText>{t('post.archive_post')}</ListItemText>
                    </MenuItem>
                )}
                <MenuItem onClick={() => setOpenDeleteDialog(true)}>
                    <ListItemIcon>
                        <DeleteForeverIcon fontSize='small' />
                    </ListItemIcon>

                    <ListItemText>{t('post.delete_post')}</ListItemText>
                </MenuItem>
            </BasicMenu>

            <BootstrapDialog
                open={openDeleteDialog}
                handleClose={() => setOpenDeleteDialog(false)}
                maxWidth='md'
                title={t('post.delete_post')}
                action={
                    <>
                        <Button onClick={() => setOpenDeleteDialog(false)}>
                            {t('button.cancel')}
                        </Button>
                        <Button
                            onClick={onClickDelete}
                            disabled={apiDeletePost.loading}
                        >
                            {t('button.delete')}
                        </Button>
                    </>
                }
            >
                {t('post.delete_post_desc')}
            </BootstrapDialog>
        </>
    );
}
